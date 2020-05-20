require('dotenv').config()
const express = require('express');
const router = express.Router();
const server = require('../server');
const firebase = require('../base.js');


// CREATE a TodoList
router.post('/createTodo', server.jsonParser, (req, res) => {
  var todoList = {
    title: req.body.title,
    description: req.body.description,
    tasks: task
  };
  console.log(todoList);

  var data =  firebase.database.ref('todo/').push();
  var send = data.set(todoList);
  var key = data.key;
  res.send(key);
  
});



// READ all TodoLists
router.get('/', (req, res) => {
  res.send(`GET request to ${req.baseUrl}`);
});

// READ one TodoList
router.get('/:todoListId', (req, res) => {
  console.log('todoListId:', req.params.todoListId);
  res.send(`GET request to ${req.baseUrl}`);
});

// UPDATE a TodoList


router.patch('/:todoListId', (req, res) => {


  console.log('todoListId:', req.params.todoListId);
  
  res.send(`PATCH request to ${req.baseUrl}`);
});

// DELETE a TodoList
router.delete('/', (req, res) => {
  res.send(`DELETE request to ${req.baseUrl}`);
});

module.exports = router;

