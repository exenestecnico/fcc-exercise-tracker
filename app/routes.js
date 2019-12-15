'use strict';

const User = require('../models/user.js');
const Exercise = require('../models/exercise.js');

exports.configure = function(app) {
  app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));
  
  app.post('/api/exercise/new-user', async (req, res) => {
    const { username } = req.body;
    let user = await User.findOne({ username }, 'username');
    if (!user) {
      const { _id } = await (new User({ username })).save();
      if (_id) user = { _id, username };
    }
    res.json(user)
  });
  
  app.get('/api/exercise/users', async (req, res) => {
    const users = await User.find({}, 'username');
    res.json(users);
  });
  
  app.post('/api/exercise/add', async (req, res) => {
    const { userId, description, duration } = req.body;
    const date = req.body.date || new Date();
    const user = await User.findById(userId, 'username');
    if (!user) return res.json({ error: 'unknown _id' });
    const { _id, username } = user;
    const exercise = await (new Exercise({ userId, description, duration, date })).save();
    if (exercise) res.json({ _id, username, description, duration, date });
    else res.json({ error: 'falied to save exercise' });
  });
  
  app.get('/api/exercise/log', async (req, res) => {
    const { userId, from, to, limit } = req.query;
    const user = await User.findById(userId, 'username');
    if (!user) return res.json({ error: 'unknown _id' });
    let query = Exercise.find({ userId }, '-_id description duration date').where('date');
    if (from) query.gte(from);
    if (to) query.lte(to);
    if (limit) query.limit(parseInt(limit));
    const log = await query.exec();
    const count = log.length;
    const { _id, username } = user;
    let response = { _id, username, count, log }
    res.json(response);
  });
};
