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
router.post('/:uid/:calendarId' ,server, (req, res) => {

    const {uid,calendarId} = req.params;
    const {name,date,duration,location,note}= req.body
   
    const eventId = db.ref('users/'+ uid + '/calendar/' + calendarId + '/events').push().key

    db.ref('users/'+ uid + '/calendar/'+ calendarId + '/events/'+ eventId)
    .set(EVENTS(eventId,name,date,duration,location,note))
    .then(()=>{ 
        res.json({eventId: eventId})
    })
    .catch((err)=> res.json({ error: err.message }));


});


//READ all Events in a calandar
router.get('/:uid/:calendarId', (req, res) => {
    const {uid,calendarId} = req.params;
    db.ref('users/'+ uid + '/calendar/' + calendarId + '/events/').once('value')
    .then((data)=> {
         if (data.val() != null) {res.json(data.val());}
         else {res.send('DOESNT EXIST')}
    })
    .catch((err)=> res.json({ err: err.message }));
});


//READ an event from calendar
router.get('/:uid/:calendarId/:eventId', (req, res) => {
    const {uid,calendarId, eventId} = req.params;
    db.ref('users/' + uid + '/calendar/' + calendarId + '/events/'+ eventId).once('value')
    .then((data)=> {
         if (data.val() != null) {res.json(data.val());}
         else {res.send('DOESNT EXIST')}
    })
    .catch((err)=> res.json({ err: err.message }));
});


//UPDATE an event inside calendar
router.patch('/:uid/:calendarId/:eventId', server, (req, res)=>{
    const {calendarId,eventId,uid} = req.params;
    const{name,date,duration,location,note} = req.body

    db.ref('users/' + uid + '/calendar/'+ calendarId+ '/events/'+ eventId).update(
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

router.delete('/:uid/:calendarId/:eventId', server, (req, res)=>{
    const {uid, calendarId,eventId} = req.params;
    const{name,date,duration,location,note} = req.body

    db.ref('users/' + uid + '/calendar/'+ calendarId+ '/events/'+ eventId).remove()
    .then(()=> res.json({status: 200, message: 'Successfully deleted event' }))
    .catch((err)=>res.json({error: err.message }))


});

module.exports= router