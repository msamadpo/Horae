require('dotenv').config();
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
//const server = require('../server');

const db = firebase.database();
// CREATE a TodoList
router.post('/', (req, res) => {

  const { userId, title, description} = req.body;
  const todoList = { title, description, tasks: [], numOfTasksAdded: 0 };
  const data = db
    .ref('users/' + userId + '/todo/')
    .push();
  data
    .set({ ...todoList, todoListid: data.key })
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

  db
    .ref('users/' + userId + '/todo/')
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// READ one TodoList
router.get('/:userId/:todoListId', (req, res) => {
  console.log('Reading ONE TodoList');
  const {userId, todoListId} = req.params;
  db
    .ref('users/' + userId + '/todo/' + todoListId)
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// UPDATE a TodoList
router.patch('/:userId/:todoListId', (req, res) => {
  console.log('Updating ONE TodoList');

  const {userId, todoListId} = req.params;
  const { title, description} = req.body;
  const updates = { title, description};
  db
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
  const {userId, todoListId} = req.params;

  db
    .ref('users/' + userId + '/todo/' + todoListId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
