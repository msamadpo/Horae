const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');



// CREATE a TodoList
router.post('/:userId',(req, res) => {
  console.log("Creating TodoList");
  const userId = req.params.userId;

const {title, description, settings} = req.body;
const todoList = { title, description, settings, tasks: [], numOfTasks: 0 };
const data = firebase.database().ref('users/' +userId+ '/todo/').push();
data
  .set({...todoList, id: data.key})
  .then(()=>{
    res.json({
      key: data.key
    });
  })
  .catch((err)=>res.json({error: err.message}));
});



// READ all TodoLists
router.get('/:userId', (req, res) => {
  console.log("Reading ALL TodoList");
 firebase
    .database()
    .ref('todo/')
    .once('value')
    .then((data)=> res.json(data.val()))
    .catch((err)=> res.json({err: err.message}));
});

// READ one TodoList
router.get('/:userId/:todoListId', (req, res) => {
  console.log("Reading ONE TodoList");
  firebase
    .database()
    .ref('todo/' + req.params.todoListId)
    .once('value')
    .then((data) => res.json(data.val()))
    .catch((err) => res.json({ err: err.message }));
});


// UPDATE a TodoList


router.patch('/:userId/:todoListId', (req, res) => {
  console.log("Updating ONE TodoList");
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
 router.delete('/:userId/:todoListId', (req, res) =>{
  console.log("Deleting ONE TodoList");
   firebase
    .database()
    .ref('todo/'+req.params.todoListId)
    .remove()
    .then(()=>
    res.json({status: 200, message: 'Successfully deleted document'})
    )
    .catch((err)=>res.json({error: err.message}));
 });

module.exports = router;

