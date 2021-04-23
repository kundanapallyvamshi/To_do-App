const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Data = require('../models/data');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Data.find().then((result) => {
    res.render('dashboard', { 'title': 'All Tasks', 'tasks': result, 'user': req.user })
  }).catch((err) => {
    console.log(err);
  });
});

// insert tasks
router.post('/dashboard', (req, res) => {
  const task = new Data(req.body);
  task.save()
    .then(() => res.redirect('/dashboard'))
    .catch((err) => console.log(err));
});

// delete tasks
router.delete('/dashboard/:id', (req, res) => {
  const id = req.params.id;
  Data.findByIdAndRemove(id)
    .then(() => res.json({redirect : '/dashboard'}))
    .catch(err => console.log(err));
});

module.exports = router;