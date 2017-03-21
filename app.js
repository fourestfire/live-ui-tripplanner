'use strict';
const express = require('express');
const nunjucks = require('nunjucks');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();
const router = require('./routes');

const models = require('./models');
const Place = models.Place;
const Hotel = models.Hotel;
const Activity = models.Activity;
const Restaurant = models.Restaurant;

const env = nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', router);

Place.sync()
    .then(function () {
        return Hotel.sync();
    })
    .then(function () {
        return Activity.sync();
    })
    .then(function () {
        return Restaurant.sync();
    })
    .then(function () {
        app.listen(3000, function () {
            console.log("i'm listening baby (on 3000)");
        });
    });

module.exports = app;

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});
