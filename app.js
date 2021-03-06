'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');

var jsonParser = require('body-parser').json;
var logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');

var db = mongoose.connection;

db.on('error', function(err) {
  console.error('Connection error: ', err);
});

db.once('open', function() {
  console.log('DB connection successful');
});

app.use('/questions', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Express server is listening on port ', port);
});
