const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');
const todoList = require('./todolist');



router.post('/:todoListId',(req, res) => {
    console.log("Creating Event");
    const todoListId = req.params.todoListId;
    const {name, deadline} = req.body;
    const task = { name, order: 0, deadline, completed: false};
    const data = firebase.database().ref('todo/'+ todoListId +'/tasks').push();
    
    data
      .set({...task, id: data.key})
      .then(()=>{
        res.json({
          key: data.key
        });
      })
      .catch((err)=>res.json({error: err.message}));
});    
module.exports= router 
