require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const bodyParser = require('body-parser');
const app= express();

const jsonParser = bodyParser.json();
module.exports.jsonParser = jsonParser;


//importing routes
const avatarRoutes = require('./routes/avatar');
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


app.use('/api/avatar', avatarRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);
const  PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));



