'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
// var Page = models.Page;
// var User = models.User;

router.get("/", function(req, res) {
  res.send("hello folks!");
})

module.exports = router;
