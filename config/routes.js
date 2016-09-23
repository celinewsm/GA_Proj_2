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
  apiKey: 'AIzaSyCh3jTzAD9ZLWRMbmyDPBnE-5xjcUJ9QLk', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
/////////////////////////////////////////////////NodeGeocoder stuff

/////////////////////////////////////////////////GET /
router.get('/', isLoggedIn, function(req, res) {
  res.render('index');
});
/////////////////////////////////////////////////GET /


/////////////////////////////////////////////////GET /<ALL>stalls
router.get('/stalls', isLoggedIn, function (req, res){
  db.stall.findAll().then(function(stalls) {
    res.json(stalls)
    // res.render('stalls/all', {stalls: stalls});
    // res.render('index', {stalls: stalls})
  });
})
/////////////////////////////////////////////////GET /<ALL>stalls

/////////////////////////////////////////////////GET /id
router.get('/stalls/:id', isLoggedIn, function (req, res){
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



/////////////////////////////////////////////////PUT /
router.put('/', isLoggedIn, function(req, res) {

  db.stall.update({
    name: req.body.name,
    address: req.body.address,
    accountMgr: req.body.accountMgr,
    lastOrders: req.body.lastOrders,
    contactNo: req.body.contactNo
  }, {
    where: {
      id: parsent(req.body.id)
    }
  }).then(function(){
    res.redirect('/');
    // db.stall.findById(req.params.id).then(function(stall)  {
    //   res.render('stalls/show', {stall: stall})
    // })
  });
});
/////////////////////////////////////////////////PUT /




/////////////////////////////////////////////////PUT /stalls/:id
router.put('/stalls/:id', isLoggedIn, function(req, res) {
  db.stall.update({
    name: req.body.name,
    address: req.body.address,
    accountMgr: req.body.accountMgr,
    lastOrders: req.body.lastOrders,
    contactNo: req.body.contactNo
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(){
    db.stall.findById(req.params.id).then(function(stall)  {
      res.render('stalls/show', {stall: stall})
    })
  });
});
/////////////////////////////////////////////////PUT /stalls/:id



/////////////////////////////////////////////////POST /
router.post('/', isLoggedIn, function(req, res) {
  geocoder.geocode({address: req.body.address, country: 'Singapore'}, function(err, geoOutput) {
    var outputLat = parseFloat(geoOutput[0].latitude);
    var outputLng = parseFloat(geoOutput[0].longitude);
    req.body.lat = outputLat;
    req.body.lng = outputLng;
    db.stall.create(req.body).then(function() {
      res.redirect('/');
    }).catch(function(err) {
      res.status(500).render('error');
    });
  });
});
/////////////////////////////////////////////////POST /



router.delete('/stalls/:id', isLoggedIn, function(req, res) {
  db.stall.findById(req.params.id).then(function(stall) {
    if (stall) {
      stall.destroy().then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
});

router.get('/stallinfo/:id', isLoggedIn, function(req,res){
  db.stall.findById(req.params.id).then(function(stall) {

      res.json(stall);
  });
})


module.exports = router;
