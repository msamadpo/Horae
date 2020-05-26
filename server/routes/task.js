const express = require('express');
const router = express.Router();

const firebase = require('../config/firebase');
const server = require('../server');

const TASK = (taskId, name, order, deadline) => {
  return {
    taskId: taskId,
    name: name,
    order: order,
    deadline: deadline,
    completed: false,
  };
};

const db = firebase.database();

function getOrderNumber(uid, todolistId) {
  let value;
  db.ref('users/' + uid + '/todo/' + todolistId + '/task/')
    .once('value')
    .then((data) => {
      if (data.val() == null) {
        value = 1000;
      } else {
        const lastIndex = data.numChildren() - 1;
        value = data.val()[lastIndex].order + 1000;
      }
    });
  return value;
}

// CREATE a task
router.post('/', server, (req, res) => {
  const { uid, todolistId, name, deadline } = req.body;
  const taskId = db
    .ref('users/' + uid + '/todo/' + todolistId + '/tasks/')
    .push().key; //getting key
  // const order = getOrderNumber(uid, todolistId);
  db.ref('users/' + uid + '/todo/' + todolistId + '/tasks/' + taskId)
    .set(TASK(taskId, name, order, deadline))
    .then(() => {
      res.json({ taskId: taskId });
    })
    .catch((err) => res.json({ error: err.message }));
});

router.patch('/:userId/:todoListId/:taskId', (req, res) => {
  console.log('Updating ONE Task');

  const userId = req.params.userId;
  const todoListId = req.params.todoListId;
  const taskId = req.params.taskId;

  const { name, deadline, completed, coins } = req.body;
  const updates = { name, order: null, deadline, completed };
  const data = firebase.database();
  const newCoins = coins + 10;

  if (completed == true) {
    data
      .ref('users/' + userId + '/todo/' + todoListId + '/tasks/' + taskId)
      .update(updates)
      .then(() =>
        res.json({ status: 200, message: 'Successfully updated document' })
      )
      .catch((err) => res.json({ error: err.message }));
  } else {
    data
      .ref('users/' + userId + '/todo/' + todoListId + '/tasks/' + taskId)
      .update(updates)
      .then(() =>
        res.json({ status: 200, message: 'Successfully updated document' })
      )
      .catch((err) => res.json({ error: err.message }));
  }
});

router.patch('/:userId/:todoListId/:taskId', (req, res) => {
  console.log('Deleting ONE Task');

  const { userId, todoListId, taskId } = req.params;
  firebase
    .database()
    .ref('users/' + userId + '/todo/' + todoListId + '/tasks/' + taskId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted document' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
