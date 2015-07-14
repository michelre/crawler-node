var slug = require('slug');
var S = require('string');
var _ = require('underscore');

exports.cpasbien = function(){
        return {
            "id": "cpasbien",
            "encoding": "UTF-8",
            "blacklistUrls": [],
            "categories":{
                "movie": {
                    "name": "Film",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=films"]
                },
                "serie": {
                    "name": "Série",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=series"]
                },
                "musique": {
                    "name": "Musique",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=musique"]
                },
                "application": {
                    "name": "Application",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=logiciels"]
                },
                "game": {
                    "name": "Jeux",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=jeux-pc", "http://www.cpasbien.pw/view_cat.php?categorie=jeux-consoles"]
                },
                "ebook": {
                    "name": "Ebook",
                    "urls": ["http://www.cpasbien.pw/view_cat.php?categorie=ebook"]
                }
            },
            "parser":{
                "lastPage": function(){ return this.$('#pagination a').eq(-2).text()},
                "nextPage": function(idPage){ return '&page=' + idPage;},
                "content": function(){ return this.$('div.ligne0, div.ligne1')},
                "objectFromContent": function(content){
                    var $ = this.$;
                    var url = $(content).find('.titre').attr('href')
                    var regex = new RegExp('(.*)\/(.*).html$');
                    return {
                        'slug': slug($(content).find('.titre').text()),
                        'title': S($(content).find('.titre').text()).humanize().s, 'size': $(content).find('.poid').text(),
                        'seeds': $(content).find('.up').text(), 'leechs': $(content).find('.down').text(),
                        'url': url, 'category': this.category.name, 'tracker': 'cpasbien',
                        'visible': true,
                        'downloadLink': 'http://www.cpasbien.pw/telechargement/' + regex.exec(url)[2] + '.torrent'
                    };
                }
            }
        }
};

exports.smartorrent = function(){
    return {
        "id": "smartorrent",
        "encoding": "ISO-8859-1",
        "blacklistUrls": [],
        "categories":{
            "movie": {
                "name": "Film",
                "urls": []
            },
            "serie": {
                "name": "Série",
                "urls": []
            },
            "musique": {
                "name": "Musique",
                "urls": []
            },
            "application": {
                "name": "Application",
                "urls": []
            },
            "game": {
                "name": "Jeux",
                "urls": []
            },
            "ebook": {
                "name": "Ebook",
                "urls": []
            },
            "other":{
                "name": "Other",
                "urls": ["http://smartorrent.com/torrents"]
            }
        },
        "parser":{
            "lastPage": function(){
                var $ = this.$;
                var regex = new RegExp("^\/torrents\/(.*)\/ordre\/dd\/");
                return parseInt(regex.exec($('#pagination a.lastpage').attr('href'))[1]);
            },
            "nextPage": function(idPage){
                return '/' + idPage + '/ordre/dd/';
            },
            "content": function(){ return this.$('#parcourir tbody tr')},
            "objectFromContent": function(content){
                var $ = this.$;
                var url = $(content).find('.nom > a').attr('href');
                var idRegex = new RegExp('\/([0-9]*)\/$');
                var name = $(content).find('.nom > a').text();
                var categories = {
                    'global_dvdrip': 'Film',
                    'global_tvrip': 'Série',
                    'global_ebook': 'Jeux',
                    'global_music': 'Musique',
                    'global_pc': 'Application',
                    'global_misc': 'Ebook'
                }
                var categoryClass = $(content).find('.nom > div:first-child').attr('class');
                var category = (categories[categoryClass]) ? categories[categoryClass] : this.category.name;
                return {
                    'slug': slug(name),
                    'title': S(name).humanize().s, 'size': $(content).find('.completed').text(),
                    'seeds': $(content).find('.seed').text(), 'leechs': $(content).find('.leech').text(),
                    'url': url, 'tracker': 'smartorrent', 'visible': true,
                    'category': category, 'downloadLink': 'http://www.smartorrent.com/?page=download&tid=' + idRegex.exec(url)[1]
                };
            }
        }
    }
};

exports.btscene = function(){
    return {
        "id": "btscene",
        "encoding": "UTF-8",
        "blacklistUrls": [],
        "categories":{
            "movie": {
                "name": "Film",
                "urls": ["http://www.btscene.cc/rss.php?type=catmain&x=1", "http://www.btscene.cc/cat/id/1/",
                    "http://www.btscene.cc/lastdaycat/type/Movies/", "http://www.btscene.cc/subcat/id/1/",
                    "http://www.btscene.cc/subcat/id/25/", "http://www.btscene.cc/subcat/id/26/",
                    "http://www.btscene.cc/subcat/id/27/", "http://www.btscene.cc/subcat/id/28/",
                    "http://www.btscene.cc/subcat/id/29/", "http://www.btscene.cc/subcat/id/30/",
                    "http://www.btscene.cc/subcat/id/2/", "http://www.btscene.cc/subcat/id/3/",
                    "http://www.btscene.cc/subcat/id/31/", "http://www.btscene.cc/subcat/id/32/",
                    "http://www.btscene.cc/subcat/id/33/", "http://www.btscene.cc/subcat/id/130/",
                    "http://www.btscene.cc/subcat/id/76/", "http://www.btscene.cc/subcat/id/34/",
                    "http://www.btscene.cc/subcat/id/77/", "http://www.btscene.cc/subcat/id/35/",
                    "http://www.btscene.cc/subcat/id/78/", "http://www.btscene.cc/subcat/id/37/",
                    "http://www.btscene.cc/subcat/id/79/", "http://www.btscene.cc/subcat/id/36/",
                    "http://www.btscene.cc/subcat/id/126/"]
            },
            "serie": {
                "name": "Série",
                "urls": ["http://www.btscene.cc/subcat/id/7/", ]
            },
            "musique": {
                "name": "Musique",
                "urls": ["http://www.btscene.cc/subcat/id/8/", "http://www.btscene.cc/subcat/id/45/",
                    "http://www.btscene.cc/subcat/id/46/", "http://www.btscene.cc/subcat/id/47/",
                    "http://www.btscene.cc/subcat/id/48/", "http://www.btscene.cc/subcat/id/49/",
                    "http://www.btscene.cc/subcat/id/86/", "http://www.btscene.cc/subcat/id/51/",
                    "http://www.btscene.cc/subcat/id/88/", "http://www.btscene.cc/subcat/id/89/",
                    "http://www.btscene.cc/subcat/id/52/", "http://www.btscene.cc/subcat/id/11/",
                    "http://www.btscene.cc/subcat/id/10/", "http://www.btscene.cc/subcat/id/55/",
                    "http://www.btscene.cc/subcat/id/56/", "http://www.btscene.cc/subcat/id/9/",
                    "http://www.btscene.cc/subcat/id/90/", "http://www.btscene.cc/subcat/id/87/",
                    "http://www.btscene.cc/subcat/id/54/", "http://www.btscene.cc/subcat/id/50/",
                    "http://www.btscene.cc/subcat/id/53/", "http://www.btscene.cc/subcat/id/91/"]
            },
            "application": {
                "name": "Application",
                "urls": ["http://www.btscene.cc/subcat/id/346/", "http://www.btscene.cc/subcat/id/18/",
                    "http://www.btscene.cc/subcat/id/44/", "http://www.btscene.cc/subcat/id/309/",
                    "http://www.btscene.cc/subcat/id/93/", "http://www.btscene.cc/subcat/id/94/",
                    "http://www.btscene.cc/subcat/id/17/"]
            },
            "game": {
                "name": "Jeux",
                "urls": ["http://www.btscene.cc/subcat/id/348/", "http://www.btscene.cc/subcat/id/38/",
                    "http://www.btscene.cc/subcat/id/39/", "http://www.btscene.cc/subcat/id/16/",
                    "http://www.btscene.cc/subcat/id/308/", "http://www.btscene.cc/subcat/id/40/",
                    "http://www.btscene.cc/subcat/id/92/", "http://www.btscene.cc/subcat/id/306/",
                    "http://www.btscene.cc/subcat/id/304/", "http://www.btscene.cc/subcat/id/305/",
                    "http://www.btscene.cc/subcat/id/12/", "http://www.btscene.cc/subcat/id/303/",
                    "http://www.btscene.cc/subcat/id/125/", "http://www.btscene.cc/subcat/id/41/",
                    "http://www.btscene.cc/subcat/id/13/", "http://www.btscene.cc/subcat/id/42/",
                    "http://www.btscene.cc/subcat/id/43/", "http://www.btscene.cc/subcat/id/307/",
                    "http://www.btscene.cc/subcat/id/349/", "http://www.btscene.cc/subcat/id/14/",
                    "http://www.btscene.cc/subcat/id/124/"]
            },
            "ebook": {
                "name": "Ebook",
                "urls": ["http://www.btscene.cc/subcat/id/356/", "http://www.btscene.cc/subcat/id/334/",
                    "http://www.btscene.cc/subcat/id/328/", "http://www.btscene.cc/subcat/id/321/",
                    "http://www.btscene.cc/subcat/id/311/", "http://www.btscene.cc/subcat/id/331/",
                    "http://www.btscene.cc/subcat/id/347/", "http://www.btscene.cc/subcat/id/327/",
                    "http://www.btscene.cc/subcat/id/315/", "http://www.btscene.cc/subcat/id/357/",
                    "http://www.btscene.cc/subcat/id/333/", "http://www.btscene.cc/subcat/id/319/",
                    "http://www.btscene.cc/subcat/id/343/", "http://www.btscene.cc/subcat/id/332/",
                    "http://www.btscene.cc/subcat/id/329/", "http://www.btscene.cc/subcat/id/344/",
                    "http://www.btscene.cc/subcat/id/326/", "http://www.btscene.cc/subcat/id/314/",
                    "http://www.btscene.cc/subcat/id/322/", "http://www.btscene.cc/subcat/id/336/",
                    "http://www.btscene.cc/subcat/id/337/", "http://www.btscene.cc/subcat/id/330/",
                    "http://www.btscene.cc/subcat/id/339/", "http://www.btscene.cc/subcat/id/316/",
                    "http://www.btscene.cc/subcat/id/358/", "http://www.btscene.cc/subcat/id/324/",
                    "http://www.btscene.cc/subcat/id/335/", "http://www.btscene.cc/subcat/id/341/",
                    "http://www.btscene.cc/subcat/id/340/"]
            },
            "other":{
                "name": "Other",
                "urls": ["http://www.btscene.cc/subcat/id/352/", "http://www.btscene.cc/subcat/id/354/",
                    "http://www.btscene.cc/subcat/id/74/", "http://www.btscene.cc/subcat/id/350/",
                    "http://www.btscene.cc/subcat/id/73/", "http://www.btscene.cc/subcat/id/19/",
                    "http://www.btscene.cc/subcat/id/355/", "http://www.btscene.cc/subcat/id/351/",
                    "http://www.btscene.cc/subcat/id/353/", "http://www.btscene.cc/subcat/id/123/",
                    "http://www.btscene.cc/subcat/id/21/", "http://www.btscene.cc/subcat/id/22/",
                    "http://www.btscene.cc/subcat/id/20/", "http://www.btscene.cc/subcat/id/122/"]
            }
        },
        "parser":{
            "lastPage": function(){
                var $ = this.$;
                var pages = $('.pagination ul li');
                return parseInt($(pages[pages.length-3]).find('a').text());
            },
            "nextPage": function(idPage){
                return 'page/' + (idPage+1) + '/';
            },
            "content": function(){ return this.$('.tor tr[id^="_"]'); },
            "objectFromContent": function(content){
                var $ = this.$;
                var url = 'http://www.btscene.cc' + $(content).find('.tname > a').attr('href');
                var idRegex = new RegExp('([0-9]*).html$');
                var category = this.category.name;
                return {
                    'slug': slug($(content).find('.tname > a').text()),
                    'title': S($(content).find('.tname > a').text()).humanize().s, 'size': $(content).find('.tsize').text(),
                    'seeds': $(content).find('.tseeds').text(), 'leechs': $(content).find('.tpeers').text(),
                    'url': url, 'tracker': 'btscene', 'visible': true,
                    'category': category,
                    'downloadLink': 'http://www.btscene.cc/torrentdownload.php?id=' + idRegex.exec(url)[1]
                };
            }
        }
    }
};

exports.omg = function(){
    return {
        "id": "omg",
        "encoding": "UTF-8",
        "blacklistUrls": [],
        "categories":{
            "movie": {
                "name": "Film",
                "urls": ["http://www.omgtorrent.com/films/"]
            },
            "serie": {
                "name": "Série",
                "urls": []
            },
            "musique": {
                "name": "Musique",
                "urls": ["http://www.omgtorrent.com/albums/"]
            },
            "application": {
                "name": "Application",
                "urls": ["http://www.omgtorrent.com/logiciels/"]
            },
            "game": {
                "name": "Jeux",
                "urls": ["http://www.omgtorrent.com/jeux/"]
            },
            "ebook": {
                "name": "Ebook",
                "urls": []
            }
        },
        "parser":{
            "lastPage": function(){ var $ = this.$; var pages = $('.nav a'); return parseInt($(pages[pages.length - 2]).text())},
            "nextPage": function(idPage){ return '?order=rls&orderby=asc&page=' + (idPage+1) + '#nav' },
            "content": function(){ return this.$('.table_corps tr[class!="table_entete"]'); },
            "objectFromContent": function(content){
                var $ = this.$;
                var url = 'http://www.omgtorrent.com' + $(content).find('td').eq(1).find('a').attr('href');
                var regex = new RegExp('([0-9]*).html$');
                return {
                    'slug': slug($(content).find('td').eq(1).find('a').text()),
                    'title': S($(content).find('td').eq(1).find('a').text()).humanize().s, 'size': $(content).find('td').eq(2).text(),
                    'seeds': $(content).find('.sources').text(), 'leechs': $(content).find('.clients').text(),
                    'url': url, 'category': this.category.name, 'tracker': 'omg',
                    'visible': true,
                    'downloadLink': 'http://www.omgtorrent.com/clic.php?id=' + regex.exec(url)[1]
                };
            }
        }
    }
};

exports.btarena = function(){
    return {
        "id": "btarena",
        "encoding": "UTF-8",
        "blacklistUrls": [],
        "categories":{
            "movie": {
                "name": "Film",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Movies"]
            },
            "serie": {
                "name": "Série",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=TV",
                    "http://tracker.btarena.org/torrents.php?parent_cat=Anime"]
            },
            "musique": {
                "name": "Musique",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Music"]
            },
            "application": {
                "name": "Application",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Software"]
            },
            "game": {
                "name": "Jeux",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Games"]
            },
            "ebook": {
                "name": "Ebook",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Ebooks"]
            },
            "other":{
                "name": "Other",
                "urls": ["http://tracker.btarena.org/torrents.php?parent_cat=Other"]
            }
        },
        "parser":{
            "lastPage": function(){
                var $ = this.$
                var regex = new RegExp('page=([0-9]*)$')
                return _.chain($('td[valign="top"]:nth-child(2) p a')).map(function(a){
                    if(regex.exec($(a).attr('href'))) return regex.exec($(a).attr('href'))[1];
                }).max().value();
            },
            "nextPage": function(idPage){ return '&page=' + (idPage+1) },
            "content": function(){
                var $ = this.$;
                return _.filter($('.bodymain2 > table > tr'), function(elem){
                    return $(elem).find('td').eq(0).hasClass('ttable_col1') && $(elem).find('td').eq(1).find('b').text() != '';
                });
            },
            "objectFromContent": function(content){
                var $ = this.$;
                var name = $(content).find('td').eq(1).find('b').text();
                var url = 'http://tracker.btarena.org/' + $(content).find('td').eq(1).find('a').attr('href');
                var regex = new RegExp('([0-9]*)$');
                return {
                    'slug': slug(name),
                    'title': S(name).humanize().s,
                    'size': $(content).find('td').eq(3).text(),
                    'seeds': $(content).find('td').eq(4).text(), 'leechs': 'nc',
                    'url': url, 'category': this.category.name, 'tracker': 'btarena',
                    'visible': true,
                    'downloadLink': 'http://tracker.btarena.org/download.php?id=' + regex.exec(url)[1] + '&name=' + name + '.torrent'
                };
            }
        }
    }
};
