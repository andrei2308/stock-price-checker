const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  // Test 1: Viewing one stock
  test('Viewing one stock: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'stockData', 'Response should have stockData');
        assert.property(res.body.stockData, 'symbol', 'Stock data should have a symbol');
        assert.property(res.body.stockData, 'price', 'Stock data should have a price');
        assert.equal(res.body.stockData.symbol, 'AAPL', 'Stock symbol should be AAPL');
        done();
      });
  });

  // Test 2: Viewing one stock and liking it
  test('Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL', like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'stockData', 'Response should have stockData');
        assert.property(res.body.stockData, 'symbol', 'Stock data should have a symbol');
        assert.property(res.body.stockData, 'price', 'Stock data should have a price');
        assert.property(res.body.stockData, 'likes', 'Stock data should have a likes property');
        assert.equal(res.body.stockData.symbol, 'AAPL', 'Stock symbol should be AAPL');
        assert.isAtLeast(res.body.stockData.likes, 1, 'Likes should be at least 1');
        done();
      });
  });

  // Test 3: Viewing the same stock and liking it again
  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'AAPL', like: true })  
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'stockData', 'Response should have stockData');
        assert.property(res.body.stockData, 'symbol', 'Stock data should have a symbol');
        assert.property(res.body.stockData, 'price', 'Stock data should have a price');
        assert.property(res.body.stockData, 'likes', 'Stock data should have a likes property');
        assert.equal(res.body.stockData.symbol, 'AAPL', 'Stock symbol should be AAPL');
        assert.isAtLeast(res.body.stockData.likes, 1, 'Likes should still be at least 1');
        done();
      });
  });

  // Test 4: Viewing two stocks
  test('Viewing two stocks: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'] })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData, 'Response should be an array');
        assert.lengthOf(res.body.stockData, 2, 'Array should have two elements');
        assert.property(res.body.stockData[0], 'symbol', 'First stock should have a symbol');
        assert.property(res.body.stockData[0], 'price', 'First stock should have a price');
        assert.property(res.body.stockData[1], 'symbol', 'Second stock should have a symbol');
        assert.property(res.body.stockData[1], 'price', 'Second stock should have a price');
        done();
      });
  });

  // Test 5: Viewing two stocks and liking them
  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'], like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData, 'Response should be an array');
        assert.lengthOf(res.body.stockData, 2, 'Array should have two elements');
        assert.property(res.body.stockData[0], 'symbol', 'First stock should have a symbol');
        assert.property(res.body.stockData[0], 'price', 'First stock should have a price');
        assert.property(res.body.stockData[0], 'likes', 'First stock should have likes');
        assert.property(res.body.stockData[1], 'symbol', 'Second stock should have a symbol');
        assert.property(res.body.stockData[1], 'price', 'Second stock should have a price');
        assert.property(res.body.stockData[1], 'likes', 'Second stock should have likes');
        done();
      });
  });
});
