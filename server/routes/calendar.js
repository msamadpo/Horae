const express = require('express');

const router = express.Router();
const firebase = require('../config/firebase');
const server = require('../server');


const CALENDAR = (calendarId, name, color)=>{
    return {
        calendarId: calendarId,
        name: name,
        settings: {
            color: color
        }
    }
}


const db = firebase.database();

// CREATE a calendar
router.post('/',server, (req, res) => {
    const {name, color} = req.body;
    const calendarId = db.ref('calendar/').push().key; //getting key
    db.ref('calendar/'+ calendarId)
    .set(CALENDAR(calendarId,name, color))
    .then(()=>{ 
        res.json({calendarId: calendarId})
    })
    .catch((err)=> res.json({ error: err.message }));
     
});



// READ all calendars
router.get('/', (req, res) => {
    db.ref('/calendar').once('value')
    .then((data)=> {
         if (data.val() != null) {res.json(data.val());}
         else {res.send('DOESNT EXIST')}
    })
    .catch((err)=> res.json({ err: err.message }));
});

// READ one calendar
router.get('/:calendarId', (req, res) => {

    const calendarId =req.params.calendarId;

    db.ref('calendar/'+ calendarId).once('value').then((data)=>{
        if(data.val() != null) {
            res.json(data.val());
        }
        else
             res.send('DOESNT EXIST!')
        });

}); 

// UPDATE a calendar
router.patch('/:calendarId', server, (req, res) => {
    const calendarId = req.params.calendarId;
    const {name, color} = req.body

    db.ref('calendar/'+ calendarId).update(
        {name: name,
        settings: {
            color: color
        }
    })
    .then(()=> res.json({status: 200, message: 'Successfully updated calendar' }))
    .catch((err)=>res.json({error: err.message }))
    
});


// DELETE a calendar
router.delete('/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;

    db.ref('calendar/' + calendarId).remove()
    .then( ()=> res.json({status: 200, message: 'Successfully deleted calendar' }))
    .catch((err) => res.json({error: err.message }));

});

module.exports= router


