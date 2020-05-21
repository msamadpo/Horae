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

/*
//Create a event
router.patch('/:calendarId'+'/createEvent',server, (req, res) => {

    var calendarId = req.params.calendarId;
    var name= req.body.name
    var date= req.body.date
    var duration= req.body.duration
    var location= req.body.location
    var note = req.body.note

    //var keys;
    db.ref('/calendar').once('value',(data)=>{
        var keys= Object.keys(data.val());

        var key=null;
        var exist = false;

        for (let element of keys) {
            if(element == calendarId){
                key = element;
                exist = true;
                break;
            }
            //else                // send back error message in response

        }
        if(exist == true) {
            var eventKey = db.ref('calendar/' + calendarId + '/events').push().key
            db.ref('calendar/' + calendarId + '/events/' + eventKey).set(EVENTS(eventKey, name, date, duration, location, note));
            res.json({
                eventId: eventKey
            })
        }
        else
            res.send("doesnt exist");

    },errData);     // problem with fetching from firebase

});
*/