const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');

// CREATE a TodoList
router.post('/', (req, res) => {
  const { title, description, settings } = req.body;
  const todoList = { title, description, settings, tasks: [] };
  const data = firebase.database().ref('todo/').push();
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
router.get('/', (req, res) => {
  firebase
    .database()
    .ref('todo/')
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// READ one TodoList
router.get('/:todoListId', (req, res) => {
  firebase
    .database()
    .ref('todo/' + req.params.todoListId)
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});

// UPDATE a TodoList
router.patch('/:todoListId', (req, res) => {
  const { title, description, settings } = req.body;
  const updates = { title, description, settings };
  firebase
    .database()
    .ref('todo/' + req.params.todoListId)
    .update(updates)
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

// DELETE a TodoList
router.delete('/:todoListId', (req, res) => {
  firebase
    .database()
    .ref('todo/' + req.params.todoListId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
