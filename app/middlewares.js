'use strict';

const express = require('express');;
const cors = require('cors');
const bodyParser = require('body-parser');

exports.mount = function(app) {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static('public'));
};

exports.handle = function(app) {
  // Not found middleware
  app.use((req, res, next) => next({ status: 404, message: 'not found' }));
  
  // Error Handling middleware
  app.use((err, req, res, next) => {
    let errCode, errMessage;
    if (err.errors) {
      // mongoose validation error
      errCode = 400; // bad request
      const keys = Object.keys(err.errors);
      // report the first validation error
      errMessage = err.errors[keys[0]].message;
    } else {
      // generic or custom error
      errCode = err.status || 500;
      errMessage = err.message || 'Internal Server Error';
    }
    res.status(errCode).type('txt').send(errMessage);
  });
}