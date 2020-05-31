const express = require('express');
const router = express.Router();
const firebase  = require('../config/firebase');

function getOrderNumber(numOfTasksAdded){
  const order = (numOfTasksAdded+1)*1000;
    return order;
  }
  
const db = firebase.database();
//Creating a Task
router.post('/',(req, res) => {
    const {userId, todoListId, name, deadline, numOfTasksAdded} = req.body;

    const data = db.ref('users/'+userId+'/todo/'+ todoListId +'/tasks').push();
    
    const order = getOrderNumber(numOfTasksAdded);
    const task = { name, order:order, deadline, completed: false};
    
    data
      .set({...task, id: data.key})
      .then(()=>{
        res.json({
          key: data.key
        });
      })
      .catch((err)=>res.json({error: err.message}));

      const newOrderLevel = numOfTasksAdded + 1;
      db
      .ref('users/'+userId+'/todo/'+ todoListId+'/numOfTasksAdded')
      .set(newOrderLevel);

      
});


//Reading all tasks in todolist 
router.get('/:userId/:todoListId', (req, res) => {
  console.log("Reading ALL TodoList");
  const {userId,todoListId} = req.params;

    db
    .ref('users/'+userId+'/todo/'+ todoListId + '/tasks')
    .once('value')
    .then((data)=> {
      if (data.val() != null) {
        let val = Object.values(data.val())
        res.json(val);
      } else {
        res.send('DOESNT EXIST');
      }
    })
    .catch((err)=> res.json({err: err.message}));
});

//Reading a single task
router.get('/:userId/:todoListId/:taskId', (req, res) => {
  console.log("Reading ALL TodoList");
  const {userId,todoListId,taskId} = req.params;

    db
    .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
    .once('value')
    .then((data)=> {
      if (data.val() != null) {
      res.json(Object(data.val()));
    } else {
      res.send('DOESNT EXIST');
    }})
    .catch((err)=> res.json({err: err.message}));
});





//Updating a Task
router.patch('/:userId/:todoListId/:taskId', (req, res) => {
    console.log("Updating ONE Task");

    const {userId,todoListId,taskId} = req.params;

    const { name, order, deadline, completed } = req.body;
    const updates = { name, order, deadline, completed};
       
    db
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .update(updates)
      .then(() =>
        res.json({ status: 200, message: 'Successfully updated document' })
      )
      .catch((err) => res.json({ error: err.message }));

  

  });


//Deleting a Task
router.delete('/:userId/:todoListId/:taskId', (req, res) => {
    console.log("Deleting ONE Task");

    const {userId, todoListId, taskId} = req.params;
    
    db
      .ref('users/'+userId+'/todo/'+ todoListId +'/tasks/'+taskId)
      .remove()
      .then(()=>
      res.json({status: 200, message: 'Successfully deleted document'})
      )
      .catch((err)=>res.json({error: err.message}));

   });



module.exports= router
