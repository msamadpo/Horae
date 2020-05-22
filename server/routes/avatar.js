const express = require('express');
const router = express.Router();

const firebase = require('../base');
const server = require('../server');

const db = firebase.database;


const AVATAR = (avatarId = null, color = null, style = null, 
  skin_color = null, eyes_color = null, tops = null, bottoms = null, shoes = null,
  headwear = null, facial_hair = null, accessories = null) => {
  return {
    avatarId: avatarId,
    hair : {
      color: color,
      style: style
    },
    skin_color: skin_color,
    eyes_color: eyes_color,
    tops: tops,
    bottoms: bottoms,
    shoes: shoes,
    headwear: headwear,
    facial_hair: facial_hair,
    accessories: accessories
  }
};


// Error
function errData(err) {
  console.log("error!");
  console.log(err);
}

/*
function writeAvatarData() {
  firebase.database.ref('avatar/').push().set(AVATAR);
}
*/

// CREATE an avatar
router.post('/', (req, res) => {
  console.log(req.param.avatarId);

  let avatarId =  db.ref('/avatar').push().key; 

  const avatar = new Avatar({
    avatarId: req.body.avatarId,
    hair : {
      color: req.body.color,
      style: req.body.style
    },
    skin_color: req.body.skin_color,
    eyes_color: req.body.eyes_color,
    tops: req.body.tops,
    bottoms: req.body.bottoms,
    shoes: req.body.shoes,
    headwear: req.body.headwear,
    facial_hair: req.body.facial_hair,
    accessories: req.body.accessories
  });
/*
  db.ref('/avatar').once('value', (data)) => {
    var keys = Object.keys(data.val());

    var key = null;

    var exist = false;

    for (let element of keys) {
      if (element == avatarId) {
        key = element;
        exist = true;
        break;
      }
    }

    if(exist == true) {
      var avatarKey = db.ref('avatar/' + avatarId).push().key;
      db.ref('avatar/' + avatarId).set(AVATAR(avatar));
      res.json({
        avatarId : avatarId
      })   
    }
    else {
      res.send("doesn't exist");
    }

  }, errData);
});
*/
  db.ref('avatar/' + avatarId).set(AVATAR(avatar))
  .then(() => {
    res.json({ avatarId : avatarId })   
  })
  .catch((err) => res.json({ error: err.message}))
   
  //res.send(`POST request to ${req.baseUrl}`);
});

/*
//READ an avatar
router.get('/', (req, res) => {
  res.json(AVATAR);
});
*/


// READ avatar
router.get('/', (req, res) => {
/*
  firebase.database.ref().once('avatarId: ', (snap) => {
    console.log(snap.val());
  });
  console.log('avatarId:', req.params.avatarId);
  res.send(`GET request to ${req.baseUrl}`);
*/

console.log('avatarId:', req.params.avatarId);
const avatarId = req.params.avatarId;

  db.ref('/avatar' + avatarId).once('value').then((data) => {
    if(data.val() != null) {
      console.log(data.val());
      res.json(data.val());
    }
    else  
      res.json("doesn't exist");
  });
});

// UPDATE avatar

/* 
  router.patch('/:avatarId', (req, res) => {
  console.log('avatarId:', req.params.avatarId);
  const updateAvatar = {};
  for (const avt of req.body) {
    updateAvatar[avt.pres] = avt.value;
  }
  avatar.update({
    avatar : req.param.avatarId,
  },
  {$set: updateAvatar})
  .exec()
  .then(result => {
    res.status(200).jason({
      message: "Avatar updated successfully",
      request: {
        type: 'GET',
        //http://localhost:5000/avatars/
        url: "" + doc.avatarId
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).jason({
      error: err
    });
  });
});
*/
router.patch('/:avatarId', (req, res) => {
  console.log('avatarId:', req.params.avatarId);
  const newAvatar = new Avatar({
    avatarId: req.body.avatarId,
    new_hair : {
      new_color: req.body.color,
      new_style: req.body.style
    },
    new_skin_color: req.body.skin_color,
    new_eyes_color: req.body.eyes_color,
    new_tops: req.body.tops,
    new_bottoms: req.body.bottoms,
    new_shoes: req.body.shoes,
    new_headwear: req.body.headwear,
    new_facial_hair: req.body.facial_hair,
    new_accessories: req.body.accessories
  });
  db.ref('avatar/' + avatarId).update(AVATAR(newAvatar))
  .then(()=> res.json({status: 200, message: 'Successfully updated avatar' }))
  .catch((err) => res.json({error: err.message}))
  //res.send(avatar);
  //res.send(avatarId);
/*
  const updataAvatar = {};
  for (const avt of req.body) {
    //updataAvatar[avt.pres] = avt.value;
  }
  res.send(`PATCH request to ${req.baseUrl}`);
*/
});

// DELETE avatar
router.delete('/', (req, res) => {
  console.log('avatarId:', req.params.avatarId);
  
  const avatarId = req.params.avatarId;

  db.ref('avatar/' + avatarId).remove()
  .then( ()=> res.json({status: 200, message: 'Successfully deleted avatar' }))
  .catch((err) => res.json({error: err.message}));
  
});


module.exports = router;
//module.exports.avatar = AVATAR;
//module.exports.createAvatar = writeAvatarData;
