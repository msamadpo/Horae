const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');


router.post('/:userId/:todoListId',(req, res) => {
    console.log("Creating Event")
    const {userId, todoListId, name, deadline} = req.body;
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


router.patch('/:userId/:todoListId/:taskId', (req, res) => {
    console.log("Updating ONE Task");

    const userId = req.params.userId; 
    const todoListId = req.params.todoListId;
    const taskId = req.params.taskId;

    const { name, deadline, completed, coins } = req.body;
    const updates = { name, order: null, deadline, completed};
    const data = firebase.database();
    const newCoins = coins+10;

    if(completed == true){
    data
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .update(updates)
      .then(() =>
        res.json({ status: 200, message: 'Successfully updated document' })
      )
      .catch((err) => res.json({ error: err.message }));

      //Add coins to user

    }

    else{

        data
        .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
        .update(updates)
        .then(() =>
          res.json({ status: 200, message: 'Successfully updated document' })
        )
        .catch((err) => res.json({ error: err.message }));
  

    }


  });


  router.delete('/:userId/:todoListId/:taskId', (req, res) => {
    console.log("Deleting ONE Task");

    const {userId, todoListId, taskId} = req.params;
     firebase
      .database()
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .remove()
      .then(()=>
      res.json({status: 200, message: 'Successfully deleted document'})
      )
      .catch((err)=>res.json({error: err.message}));
   });



module.exports= router
