'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const Place = models.Place;
const Hotel = models.Hotel;
const Activity = models.Activity;
const Restaurant = models.Restaurant;

router.get("/", function(req, res, next) {
  var outerScopeContainer = {};
  Hotel.findAll()
  .then(function (dbHotels) {
    outerScopeContainer.dbHotels = dbHotels;
    return Restaurant.findAll();
  })
  .then(function (dbRestaurants) {
    outerScopeContainer.dbRestaurants = dbRestaurants;
    return Activity.findAll();
  })
  .then(function (dbActivities) {
    // console.log(outerScopeContainer)
    // res.json(outerScopeContainer)
    res.render('index', {
      hotels: outerScopeContainer.dbHotels,
      restaurants: outerScopeContainer.dbRestaurants,
      activities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;
