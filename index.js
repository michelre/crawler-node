'use strict';

var _ = require('underscore');
var request = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var configuration = require('./configuration/crawler');
var MongoClient = require('mongodb').MongoClient;
var iconv = require('iconv-lite');
var dns = require('dns');

var args = parseArguments();
var tracker = configuration[args['tracker']]();

dns.lookup('mongo.mongo.docker', function(err, host){
   console.log(host)
});

openMongoConnection().then(function(mongo){
    Promise.all(_.map(_.keys(tracker.categories), function(category){
        return pagesByCategory(tracker['categories'][category]).then(function(urls){
            return extractDataFromUrls(urls, category);
        }).then(function(data){
            return Promise.all(_.map(data, function(chunk){
                return insertMongo(chunk, mongo.collection)
            }));
        })
    })).then(function(){
        mongo.db.close();
    }).catch(function(){
        mongo.db.close();
    });
}).catch(function(err){
    console.log('Problem while connecting to Mongo ' + err);
});

function openMongoConnection(){
    var host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
    var port = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

    return new Promise(function(resolve, reject){
        MongoClient.connect('mongodb://' + host + ':' + port + '/torrents', function(err, db) {
            if(err != null){
                reject(err)
            }else{
                var collection = db.collection(tracker.id);
                resolve({'db': db, 'collection': collection});
            }
        });
    });
}

function parseArguments(){
    return _.chain(process.argv).map(function(arg){
        var match = new RegExp('--(.*)=(.*)').exec(arg);
        if(match)
            return _.flatten([[match[1]], [match[2]]])
    }).compact().object().value();
}

function pagesByCategory(category){
    var promises = _.chain(category['urls']).map(function(url){
        return request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(function(body){
            var $ = cheerio.load(body);
            var self = {'category': category, '$': $};
            var lastPage = tracker['parser']['lastPage'].apply(self, []);
            return _.chain(_.range(parseInt(lastPage) + 1)).map(function(idPage){ return url + tracker['parser']['nextPage'].apply(self, [idPage])}).value();
        })
    }).value();
    return Promise.all(promises).then(function(data){
        return _.flatten(data);
    })
}

function extractDataFromUrls(urls, category){
    var promises = _.map(urls, function(url){
        return request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            encoding: null
        }).then(function(body){
            var _body = (tracker.encoding != 'UTF-8') ? iconv.decode(new Buffer(body), tracker.encoding) : body;
            var $ = cheerio.load(_body)
            var self = {'category': tracker['categories'][category], '$': $};
            var rows = tracker['parser']['content'].apply(self, [])
            return _.map(rows, function(row){
                return tracker['parser']['objectFromContent'].apply(self, [row])
            })
        });
    });
    var chunks = _.chain(promises).groupBy(function(p, index){
        return Math.floor(index/10);
    }).toArray().value();
    return new Promise(function(resolve, reject){
        resolve(chunks)
    })
}

function insertMongo(chunk, collection){
    return Promise.all(chunk).then(function(data){
        return _.chain(data).flatten().reject(function(torrent){ return _.contains(tracker.blacklistUrls, torrent.link)}).value();
    }).then(function(data){
        return new Promise(function(resolve, reject){
            if(data.length > 0)
                collection.insert(data);
            resolve();
        });
    });
}