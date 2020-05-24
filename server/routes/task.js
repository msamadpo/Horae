const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');



router.post('/:userId/:todoListId',(req, res) => {
    console.log("Creating Event");
    const userId = req.params.userId;
    const todoListId = req.params.todoListId;
    const {name, deadline} = req.body;
    const task = { name, order: null, deadline, completed: false};
    const data = firebase.database().ref('users/'+userId+'/todo/'+ todoListId +'/tasks').push();

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
