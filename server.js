'use strict';

const express = require('express');
const mongoose = require('mongoose');

const middlewares = require('./app/middlewares.js');
const routes = require('./app/routes.js');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const app = express();
middlewares.mount(app);
routes.configure(app);
middlewares.handle(app);

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log('Your app is listening on port ' + listener.address().port)
);
