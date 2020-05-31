require('dotenv').config()
const express = require('express');
const logger = require('morgan');               // log performance + GET/POST requests + JS console in terminal
const bodyParser = require('body-parser');
const app = express();
const firebase = require("firebase");


firebase.initializeApp(firebaseConfig);
​
// Get a reference to the database service
var database = firebase.database();
​
// create new user in remote Firebase DB
function writeUserData(userId, name, email, imageUrl) {
    database.ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}
​
​
// Import Routes
const avatarRoutes = require('./routes/avatar');
const calendarRoutes = require('./routes/calendar');
const todoListRoutes = require('./routes/todolist');
/* Probably will need separate routers for events and todos */
​
// Middleware
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(logger('dev'));
​
​
// Routes
app.get('/homepage', (req, res) => {                        
    res.send("Homepage (only for authorized personel)");
})
​
app.get("/", (req, res) => {
    res.send("Welcome to Horea landing page!!");
})
​
app.get("/api/register", (req, res) => {
    writeUserData(1245345, "Z", "team@india.com", "www.ice.com", "www.google.com");
});
​
​
app.use('/api/avatar', avatarRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);
​
​
​
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));

