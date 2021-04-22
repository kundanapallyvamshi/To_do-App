const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Data = require('../models/data');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    Data.find().then((result)=>{
    res.render('dashboard',{title : 'All Tasks',tasks : result,user: req.user})
  }).catch((err)=>{
    console.log(err);
  });
});



router.get("/dashboard", function(req, res){
    res.redirect('/tasks');
});

router.get('/',(req,res)=>{
    // if we use .html pages
    //res.sendFile('index.html',{root : __dirname})  
    //.ejs files
    res.redirect('/tasks');
});

router.get('/tasks',(req,res)=>{

    // const tasks = [{text : 'Hello Every One'},{text : "Im Vamshi"}];
    // res.render('about',{title : 'All Tasks',tasks});

    Data.find().then((result)=>{
        res.render('dashboard',{title : 'All Tasks',tasks : result,user: req.user})
    }).catch((err)=>{
        console.log(err);
    });

});

router.post('/tasks',(req,res)=>{
    //console.log(req.body);
    const task = new Data(req.body);
    task.save().then((result)=>{
        res.redirect('/tasks');
    }).catch((err)=>{
        console.log(err);
    });
});

//need to add delete request logic at server end

router.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    //Data.findById(id).__v=1;
    Data.findByIdAndRemove(id).then(result=>{
        //console.log(id);
        //res.redirect('/tasks');
        res.json({redirect : '/tasks'})
    }).catch(err=>{console.log(err);});
});


module.exports = router;
