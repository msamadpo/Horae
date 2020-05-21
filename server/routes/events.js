const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const server = require('../server');

const db = firebase.database();

const EVENTS = (eventId, name,date,duration,location,note)=>{
    return {
          eventId: eventId,
          name: name,
          date: date,
          duration: duration,
          location: location,
          note: note

      }

};


//CREATE an event inside calendar
router.post('/:calendarId' ,server, (req, res) => {

    const calendarId = req.params.calendarId;
    const {name,date,duration,location,note}= req.body
   
    const eventId = db.ref('calendar/' + calendarId + '/events').push().key

    db.ref('calendar/'+ calendarId + '/events/'+ eventId)
    .set(EVENTS(eventId,name,date,duration,location,note))
    .then(()=>{ 
        res.json({eventId: eventId})
    })
    .catch((err)=> res.json({ error: err.message }));


});


//READ all Events in a calandar
router.get('/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;
    db.ref('calendar/' + calendarId + '/events/').once('value')
    .then((data)=> {
         if (data.val() != null) {res.json(data.val());}
         else {res.send('DOESNT EXIST')}
    })
    .catch((err)=> res.json({ err: err.message }));
});

//READ an event from calendar
router.get('/:calendarId/:eventId', (req, res) => {
    const {calendarId, eventId} = req.params;
    db.ref('calendar/' + calendarId + '/events/'+ eventId).once('value')
    .then((data)=> {
         if (data.val() != null) {res.json(data.val());}
         else {res.send('DOESNT EXIST')}
    })
    .catch((err)=> res.json({ err: err.message }));
});

//UPDATE an event inside calendar
router.patch('/:calendarId/:eventId', server, (req, res)=>{
    const {calendarId,eventId} = req.params;
    const{name,date,duration,location,note} = req.body

    db.ref('calendar/'+ calendarId+ '/events/'+ eventId).update(
        {
            name: name,
            date: date,
            duration: duration,
            location: location,
            note: note
        }
    )
    .then(()=> res.json({status: 200, message: 'Successfully updated event' }))
    .catch((err)=>res.json({error: err.message }))


});

router.delete('/:calendarId/:eventId', server, (req, res)=>{
    const {calendarId,eventId} = req.params;
    const{name,date,duration,location,note} = req.body

    db.ref('calendar/'+ calendarId+ '/events/'+ eventId).remove()
    .then(()=> res.json({status: 200, message: 'Successfully deleted event' }))
    .catch((err)=>res.json({error: err.message }))


});

module.exports= router