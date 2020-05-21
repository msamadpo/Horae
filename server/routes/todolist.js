require('dotenv').config()
const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');

var database = firebase.database;


var d = new Date("October 13, 2014 11:13:00");
var task_1 = {id: 6548415184, name: "shirt", prority_level: "High", deadline: d, completed: true};
var task_2 = {id: 1531535063, name: "shoes", prority_level: "Low", deadline: d, completed: false};
var tasks = [task_1, task_2]

const TODO_LIST = {
    title: "Shooping",
    description: "Items to buy",
    todo_tasks : tasks
};

//writeUserData("220acaff8aab328e6b3a725f93e6cdf1", "Grocery", "Items to buy for dinner tonight", tasks);
// CREATE a TodoList
function writeTodoData() {
    firebase.database.ref('todo/').push().set(TODO_LIST);
}

function writeTodoDataPost(todo){
    firebase.database.ref('todo/').push().set(todo);

}

router.post('/', (req, res) => {
    res.send(`POST request to ${req.baseUrl}`);
});

// READ all TodoLists
router.get('/', (req, res) => {
    res.send(`GET request to ${req.baseUrl}`);
});

// READ one TodoList
router.get('/:todoListId', (req, res) => {
    console.log('todoListId:', req.params.todoListId);
    res.send(`GET request to ${req.baseUrl}`);
});

// UPDATE a TodoList
router.patch('/:todoListId', (req, res) => {
    console.log('todoListId:', req.params.todoListId);
    res.send(`PATCH request to ${req.baseUrl}`);
});

// DELETE a TodoList
router.delete('/', (req, res) => {
    res.send(`DELETE request to ${req.baseUrl}`);
});

module.exports = router;
module.exports.todo_list = TODO_LIST;
module.exports.writeTodoData = writeTodoData;
module.exports.writeTodoDataPost = writeTodoDataPost;

