'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/users', function(req, res){
  res.send(tasks.listPeople());
});

router.get('/users/:name/tasks', function(req, res){
  var taskList = tasks.list(req.params.name);
  if (req.query.status) {
    taskList = taskList.filter(function(val){  // filter out values according to our test type
      return req.query.status === "complete" ? val.complete === true : val.complete === false;
    });
  };
  res.send(taskList);
});

router.post('/users/:name/tasks', function(req, res){
  var task = tasks.add(req.params.name, req.body);
  if (task.hasOwnProperty('content') && task.hasOwnProperty('complete') && Object.keys(task).length === 2) {
    res.status(201).send(task);
  } else {
    res.status(400).send(task);
  }
})

router.put('/users/:name/tasks/:index', function(req, res){
  tasks.complete(req.params.name, req.params.index);
  res.send();
});

router.delete('/users/:name/tasks/:index', function(req, res){
  tasks.remove(req.params.name, req.params.index);
  res.status(204);
  res.send();
});

module.exports = router;
