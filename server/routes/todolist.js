const express = require('express');

const router = express.Router();

// CREATE a TodoList
router.post('/', (req, res) => {
  res.send(`POST request to ${req.baseUrl}`);
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
