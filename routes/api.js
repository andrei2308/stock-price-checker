'use strict';

const axios = require('axios'); // Assuming axios is used for fetching stock data
let stockLikes = {};  // To store likes for each stock (this should be in a database in a real app)

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let stock = req.query.stock; 
      let like = req.query.like === 'true';  
      }
    );
};
