const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import Routes
const avatarRoutes = require('./routes/avatar');
const calendarRoutes = require('./routes/calendar');
const todoListRoutes = require('./routes/todolist');
/* Probably will need separate routers for events and todos */

// Middleware
app.use(bodyParser.json({ type: 'application/*+json' }));

// Routes
app.use('/api/avatar', avatarRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/todolist', todoListRoutes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Sever running on port ${PORT}...`));
