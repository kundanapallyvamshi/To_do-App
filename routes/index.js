const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Data = require('../models/Data');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome', { title: 'Welcome' }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Data.find({ userId: req.user._id }).sort({createdAt: -1}).then((result) => {
    res.render('dashboard', { title: 'All Tasks', tasks: result, user: req.user })
  }).catch((err) => {
    console.log(err);
  });
});

// insert tasks
router.post('/dashboard', (req, res) => {
  // update task status
  const {_id, isDone } = req.body
  if (_id && isDone) {
    Data.updateOne({ _id: _id, userId: req.user._id }, { isDone: isDone })
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
  } else {
  // insert task
  const task = new Data({ ...req.body, userId: req.user._id });
  task.save()
    .then(() => res.redirect('/dashboard'))
    .catch((err) => console.log(err));
  }
});

// delete tasks
router.delete('/dashboard/:id', (req, res) => {
  const id = req.params.id;
  // var newvalues = { $set: {isDone : "1"} };
  Data.findByIdAndRemove(id)
    .then(() => res.json({redirect : '/dashboard'}))
  // Data.updateOne({isDone : true})
  //   .then(() => res.json({ redirect: '/dashboard' }))
    .catch(err => console.log(err));
});

module.exports = router;