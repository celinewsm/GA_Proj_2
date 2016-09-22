var express = require('express');
var db = require('./../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');





router.get('/:id/edit', isLoggedIn, function(req, res) {
  db.taco.findById(req.params.id).then(function(taco) {
    if (taco) {
      res.render('tacos/edit', {taco: taco});
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});

router.get('/:id', function(req, res) {
  db.taco.findById(req.params.id).then(function(taco) {
    if (taco) {
      res.render('tacos/show', {taco: taco});
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});




//CURRENT WORKING







router.delete('/:id', isLoggedIn, function(req, res) {
  db.taco.findById(req.params.id).then(function(taco) {
    if (taco) {
      taco.destroy().then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
});




module.exports = router;
