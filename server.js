'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const logger = require('./middleware/logger');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');

// instance of our server 
const app = express();

// middleware
app.use(cors());
// app.use(logger);

// basic endpoint
// here we've added the "logger" middleware we created
// specifically for this route as opposed to all routes
app.get('/', logger, (req, res, next) => {
  res.status(200).send('Hello world');
});

app.get('/bad', (req, res, next) => {
  next('We have a problem');
});

// our custom error handlers
app.use(notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

module.exports = { start, app };