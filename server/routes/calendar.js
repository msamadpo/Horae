const express = require('express');

const router = express.Router();

const CALENDARS = [
  {
    id: '5d32b4b2fd13e359f9d0c593',
    title: 'Work',
    settings: { color: 'red' },
    events: [
      {
        id: '1d3ac4e2gd13a359f9d0c593',
        name: 'Sun God',
        date: 'Sat May 02 2020 20:02:32 GMT-0700 (Pacific Daylight Time)',
        duration: 1,
        location: '',
        note: '',
      },
    ],
  },
];

// CREATE a calendar
router.post('/', (req, res) => {
  res.send(`POST request to ${req.baseUrl}`);
});

// READ all calendars
router.get('/', (req, res) => {
  res.json(CALENDARS);
});

// READ one calendar
router.get('/:calendarId', (req, res) => {
  console.log('calendarId:', req.params.calendarId);
  res.send(`GET request to ${req.baseUrl}`);
});

// UPDATE a calendar
router.patch('/:calendarId', (req, res) => {
  console.log('calendarId:', req.params.calendarId);
  res.send(`PATCH request to ${req.baseUrl}`);
});

// DELETE a calendar
router.delete('/', (req, res) => {
  res.send(`DELETE request to ${req.baseUrl}`);
});

module.exports = router;
