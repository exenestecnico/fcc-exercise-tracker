'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: Number,
  date: Date
});

module.exports = mongoose.model('Exercise', exerciseSchema);
