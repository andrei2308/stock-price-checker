'use strict';


let stockLikes = {}; 

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let stock = req.query.stock; 
      let like = req.query.like === 'true';  
      //simulating stockData fetching
      function fetchStockData(stockSymbol) {
        const mockPrices = {
          'AAPL': 150.75,
          'GOOG': 2725.50
        };
        return {
          symbol: stockSymbol,
          price: mockPrices[stockSymbol] || 100.00 //default price if it isn't found
        };
        //like handler
        function handleLikes(stockSymbol, isLiked) {
          if (!stockLikes[stockSymbol]) {
            stockLikes[stockSymbol] = 0;  
          }
          if (isLiked) {
            stockLikes[stockSymbol] += 1;  
          }
          return stockLikes[stockSymbol];  
        }
        
      }
      if (typeof stock === 'string') {
        const stockData = fetchStockData(stock);  
        let likes = handleLikes(stock, like);  
        res.json({
          stockData: {
            symbol: stockData.symbol.toString(),
            price: Number(stockData.price),
            likes: Number(likes)
          }
        });

      } else if (Array.isArray(stock)) {
        // Multiple stocks case
        let stockDataArray = stock.map(stockSymbol => {
          const stockData = fetchStockData(stockSymbol);  
          let likes = handleLikes(stockSymbol, like);  
          return {
            symbol: stockData.symbol.toString(),
            price: Number(stockData.price),
            likes: Number(likes)
          };
        });
        res.json({
          stockData: stockDataArray
        });

      } else {
        res.status(400).json({ error: 'Invalid stock query' });
      }
      }
    );
};
