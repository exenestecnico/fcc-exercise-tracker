'use strict';

const mongoose = require('mongoose');
const shortid = require('mongoose-shortid-nodeps');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: shortid, len: 5, alphabet: 'abcdefghijklmnopqrtsuvwxyz', retries: 4 },
  username: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
