const express = require('express');
const router = express.Router();

const { firebase } = require('../config/firebase');

function getOrderNumber(numOfTasks){
  const order = (numOfTasks+1)*1000;
    return order;
  }
  
  


//Creating a Task
router.post('/',(req, res) => {
    console.log("Creating Task")
    const {userId, todoListId, name, deadline, numOfTasks} = req.body;

    const data = firebase.database().ref('users/'+userId+'/todo/'+ todoListId +'/tasks').push();
    
    const order = getOrderNumber(numOfTasks);
    const task = { name, order:order, deadline, completed: false};
    
    

    data
      .set({...task, id: data.key})
      .then(()=>{
        res.json({
          key: data.key
        });
      })
      .catch((err)=>res.json({error: err.message}));

      const newNumOfTasks = numOfTasks + 1;
      firebase
      .database()
      .ref('users/'+userId+'/todo/'+ todoListId+'/numOfTasks')
      .set(newNumOfTasks);

      
});

//Updating a Task
router.patch('/:userId/:todoListId/:taskId', (req, res) => {
    console.log("Updating ONE Task");

    const userId = req.params.userId; 
    const todoListId = req.params.todoListId;
    const taskId = req.params.taskId;

    const { name, order, deadline, completed, coins } = req.body;
    const updates = { name, order, deadline, completed};
    const data = firebase.database();
    

    if(completed == true){
    data
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .update(updates)
      .then(() =>
        res.json({ status: 200, message: 'Successfully updated document' })
      )
      .catch((err) => res.json({ error: err.message }));

      //Add coins to user
      const newCoins = coins+10;
      firebase
      .database()
      .ref('users/'+userId+'/todo/'+ todoListId+'/coins')
      .set(newCoins);


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


//Deleting a Task
router.delete('/', (req, res) => {
    console.log("Deleting ONE Task");

    const {userId, todoListId, taskId, numOfTasks} = req.body;
    
     firebase
      .database()
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .remove()
      .then(()=>
      res.json({status: 200, message: 'Successfully deleted document'})
      )
      .catch((err)=>res.json({error: err.message}));

      const newNumOfTasks = numOfTasks - 1;
      firebase
      .database()
      .ref('users/'+userId+'/todo/'+ todoListId+'/numOfTasks')
      .set(newNumOfTasks);


   });



module.exports= router
