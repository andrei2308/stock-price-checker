'use strict';


let stockLikes = {}; 

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let stock = req.query.stock; 
      let like = req.query.like === 'true';  
      }
    );
};
