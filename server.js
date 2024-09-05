'use strict';
require('dotenv').config();
const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const apiRoutes   = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');
const helmet = require("helmet");

// Initialize the app
const app = express();

// Apply helmet security middleware after initializing the app
app.use(helmet({
  frameguard: {       
    action: 'deny'
  },
  contentSecurityPolicy: {    
    directives: {
      defaultSrc: ["'self'"],  
      scriptSrc: ["'self'"],   
      styleSrc: ["'self'"],    
    }
  }
}));

// Serve static files from /public
app.use('/public', express.static(process.cwd() + '/public'));

// Enable CORS for all routes
app.use(cors({origin: '*'})); //For FCC testing purposes only

// Parse incoming requests with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API 
apiRoutes(app);  
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Start the server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if(process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; // for testing
