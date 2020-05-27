require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const bodyParser = require('body-parser');
const app= express();
const firebase = require('firebase');

module.exports = bodyParser.json();


//importing routes
const avatarRoutes = require('./routes/avatar');
//const itemListRoutes = require('./routes/itemlist');
const calendarRoutes = require('./routes/calendar');
const todoListRoutes = require('./routes/todolist');

//Middleware
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(logger('dev'));

//routes
app.get('/homepage', (req, res) => {
    res.send("Homepage (only for authorized personel)");
});

app.get("/", (req, res) => {
    res.send("Welcome to Horea landing page!!");
});

app.get("/api/register", (req, res) => {
    writeUserData(1245345, "Anh Pham", "team@thehub.com");
});

/*
//Avatar stuff
app.get("/api/createAvatar", (req, res) => {
    avatarRoutes.createAvatar();
    res.send("Sent Avatar to FB");
});
*/



app.use('/api/avatar', avatarRoutes);
//app.use('/api/itemlist', itemListRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);

const  PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));

