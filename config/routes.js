var express = require('express');
var db = require('./../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
// var geocoder = require('geocoder');u
var NodeGeocoder = require('node-geocoder');
var outputLat;
var outputLng;


/////////////////////////////////////////////////NodeGeocoder stuff
var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBNEuahujgW6PKmTndNwf6yDxzGm20-TBc', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
/////////////////////////////////////////////////NodeGeocoder stuff

/////////////////////////////////////////////////GET /
router.get('/', function(req, res) {
  res.render('index');
});
/////////////////////////////////////////////////GET /


/////////////////////////////////////////////////GET /id
router.get('/stalls/:id', function (req, res){
  db.stall.findById(req.params.id).then(function(stall) {
    if (stall) {
      res.render('stalls/show', {stall: stall});
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});
/////////////////////////////////////////////////GET /id



/////////////////////////////////////////////////POST /
router.post('/', function(req, res) {
  geocoder.geocode({address: req.body.address, country: 'Singapore'}, function(err, geoOutput) {
    var outputLat = parseFloat(geoOutput[0].latitude);
    var outputLng = parseFloat(geoOutput[0].longitude);
    req.body.lat = outputLat;
    req.body.lng = outputLng;
    db.stall.create(req.body).then(function(taco) {
      res.redirect('/');
    }).catch(function(err) {
      res.status(500).render('error');
      console.log(err);
    });
  });
});
/////////////////////////////////////////////////POST /





router.put('/:id', function(req, res) {
  db.stall.findById(req.params.id).then(function(taco) {
    if (taco) {
      taco.updateAttributes(req.body).then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
});


router.get('/stalls', function (req, res){
  db.stall.findAll().then(function(stalls) {
    res.json(stalls)
    // res.render('index', {stalls: stalls})
  });
})




module.exports = router;
