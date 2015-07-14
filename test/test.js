'use strict';
var assert = require('assert');
var testNode = require('../');

describe('test-node node module', function () {
  it('must have at least one test', function () {
    testNode();
    assert(false, 'I was too lazy to write any tests. Shame on me.');
  });
});
