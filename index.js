var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var router = require('./config/routes')
const dotenv = require('dotenv')
dotenv.load()

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET ,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(ejsLayouts);

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.use('/auth', require('./controllers/auth'));

app.use('/', router)


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
