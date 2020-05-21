
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app= express();

module.exports = bodyParser.json()

//importing routes
const avatarRoutes = require('./routes/avatar');

//calendar
const calendarRoutes = require('./routes/calendar');
const eventsRoutes = require('./routes/events');

//todo lists
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

app.use('/api/avatar', avatarRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);
app.use('/api/calendar/events',eventsRoutes);
const  PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));





