const express = require('express');
const router = express.Router();

const firebase = require('../config/firebase');
const server = require('../server');

const CALENDAR = (calendarId, name, color) => {
  return {
    calendarId: calendarId,
    name: name,
    settings: {
      color: color,
    },
  };
};

const db = firebase.database();

// CREATE a calendar
router.post('/', server, (req, res) => {
  const { uid, name, color } = req.body;
  const calendarId = db.ref('users/' + uid + '/calendar/').push().key; //getting key
  db.ref('users/' + uid + '/calendar/' + calendarId)
    .set(CALENDAR(calendarId, name, color))
    .then(() => {
      res.json({ calendarId: calendarId });
    })
    .catch((err) => res.json({ error: err.message }));
});

// READ all calendars
router.get('/:uid', (req, res) => {
  const uid = req.params.uid;
  db.ref('users/' + uid + '/calendar')
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        res.json(data.val());
      } else {
        res.send('DOESNT EXIST');
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

// READ one calendar
router.get('/:uid/:calendarId', (req, res) => {
  const { uid, calendarId } = req.params;

  db.ref('users/' + uid + '/calendar/' + calendarId)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        res.json(data.val());
      }
      //basically if the key doesnt exist
      else res.send('DOESNT EXIST!');
    });
});

// UPDATE a calendar
router.patch('/:uid/:calendarId', server, (req, res) => {
  const { uid, calendarId } = req.params;
  const { name, color } = req.body;

  db.ref('users/' + uid + '/calendar/' + calendarId)
    .update({
      name: name,
      settings: {
        color: color,
      },
    })
    .then(() =>
      res.json({ status: 200, message: 'Successfully updated calendar' })
    )
    .catch((err) => res.json({ error: err.message }));
});

// DELETE a calendar
router.delete('/:uid/:calendarId', (req, res) => {
  const { uid, calendarId } = req.params;
  db.ref('users/' + uid + '/calendar/' + calendarId)
    .remove()
    .then(() =>
      res.json({ status: 200, message: 'Successfully deleted calendar' })
    )
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
