'use strict';

let stockLikes = {};  // To store likes for each stock

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      let stock = req.query.stock; 
      let like = req.query.like === 'true';  

      
      function fetchStockData(stockSymbol) {
        // Mock stock prices
        const mockPrices = {
          'AAPL': 150.75,
          'GOOG': 2725.50
        };
        return {
          symbol: stockSymbol,
          price: mockPrices[stockSymbol] || 100.00  // Default price if stock isn't found
        };
      }

      // Function to handle stock likes
      function handleLikes(stockSymbol, isLiked) {
        if (!stockLikes[stockSymbol]) {
          stockLikes[stockSymbol] = 0;  
        }
        if (isLiked) {
          stockLikes[stockSymbol] += 1;  
        }
        return stockLikes[stockSymbol]; 
      }

      // Single stock case
      if (typeof stock === 'string') {
        const stockData = fetchStockData(stock);  // Fetch stock data
        let likes = handleLikes(stock, like);  // Handle likes for this stock

        // Respond with stockData containing symbol, price, and likes
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
    });
};
