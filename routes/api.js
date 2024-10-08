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
          price: mockPrices[stockSymbol] || 100.00,  // Default price if stock isn't found
          likes: handleLikes(stockSymbol, like)
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

        // Respond with stockData containing symbol, price, and likes
        res.json({
          stockData: {
            symbol: stockData.symbol.toString(),
            price: Number(stockData.price),
            likes: Number(stockData.likes)
          }
        });

      } else if (Array.isArray(stock) && stock.length === 2) {
        // Multiple stocks case
        const stockData1 = fetchStockData(stock[0]);
        const stockData2 = fetchStockData(stock[1]);

        // Calculate relative likes
        const rel_likes1 = stockData1.likes - stockData2.likes;
        const rel_likes2 = stockData2.likes - stockData1.likes;

        // Respond with both stock data including relative likes
        res.json({
          stockData: [
            {
              symbol: stockData1.symbol.toString(),
              price: Number(stockData1.price),
              rel_likes: Number(rel_likes1)
            },
            {
              symbol: stockData2.symbol.toString(),
              price: Number(stockData2.price),
              rel_likes: Number(rel_likes2)
            }
          ]
        });

      } else {
        res.status(400).json({ error: 'Invalid stock query' });
      }
    });
};
