require('dotenv').config();
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

const { firebase } = require('../config/firebase');

// CREATE a TodoList
router.post('/', (req, res) => {
  console.log('Creating TodoList');

  const { userId, title, description, settings } = req.body;
  const todoList = { title, description, settings, tasks: [], numOfTasks: 0 };
  const data = firebase
    .database()
    .ref('users/' + userId + '/todo/')
    .push();
  data
    .set({ ...todoList, id: data.key })
    .then(() => {
      res.json({
        key: data.key,
      });
    })
    .catch((err) => res.json({ error: err.message }));
});

// READ all TodoLists
router.get('/:userId', (req, res) => {
  console.log('Reading ALL TodoList');
  const userId = req.params.userId;

  firebase
    .database()
    .ref('users/' + userId + '/todo/')
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// READ one TodoList
router.get('/:userId/:todoListId', (req, res) => {
  console.log('Reading ONE TodoList');
  const userId = req.params.userId;
  const todoListId = req.params.todoList;
  firebase
    .database()
    .ref('users/' + userId + '/todo/' + todoListId)
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// UPDATE a TodoList
router.patch('/:userId/:todoListId', (req, res) => {
  console.log('Updating ONE TodoList');
  const userId = req.params.userId;
  const todoListId = req.params.todoList;

  const { title, description, settings } = req.body;
  const updates = { title, description, settings };
  firebase
    .database()
    .ref('users/' + userId + '/todo/' + todoListId)
    .update(updates)
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

// DELETE a TodoList
router.delete('/:userId/:todoListId', (req, res) => {
  console.log('Deleting ONE TodoList');
  const userId = req.params.userId;
  const todoListId = req.params.todoList;

  firebase
    .database()
    .ref('users/' + userId + '/todo/' + todoListId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
