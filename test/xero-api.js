/*eslint handle-callback-err:0 */
'use strict';

var assert = require('chai').assert;
var Xero = require('../index');

// keys/index.js
// export is obj with strings consumer key, consumer secret, RSA private key
var keys = require('./keys');
var resources = require('../src/resources');

var xero = new Xero(keys.consumer, keys.secret, keys.rsa);

describe('Xero API calls', function() {

  this.timeout(6000);

  it('#find w/ filter', function(done) {
    var filter = 'Date > ' + xero.helpers.dateToXeroDateTimeString(new Date(0));
    xero.invoices.find(filter, function(err, data) {
      assert.isArray(data.Response.Invoices.Invoice);
      done();
    });
  });

  it('#find w/out filter', function(done) {
    xero.invoices.find(function(err, data) {
      assert.isArray(data.Response.Invoices.Invoice);
      done();
    });
  });

  it('All resources', function(done) {

    var completed = [];

    resources.forEach(function(r) {
      xero[r.toLowerCase()].find(function(err, data) {
        completed.push(r);
        assert.equal(data.Response.Status, 'OK');
      });
    });
    setTimeout(function() {
      assert.equal(completed.length, resources.length);
      done();
    }, 3000);
  });

});
