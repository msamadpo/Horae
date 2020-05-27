const express = require('express');
const router = express.Router();

const firebase = require('../config/firebase');
const server = require('../server');


const AVATAR = (avatarId, hair_style, hair_color, skin_color, eyes_color, tops, bottoms, shoes,
  headwear, facial_hair, accessories) => {
  return {
    avatarId: avatarId,
    hair_style: hair_style,
    hair_color: hair_color,
    skin_color: skin_color,
    eyes_color: eyes_color,
    tops: tops,
    bottoms: bottoms,
    shoes: shoes,
    headwear: headwear,
    facial_hair: facial_hair,
    accessories: accessories
  }
}

const db = firebase.database();



// CREATE an avatar
router.post('/', server, (req, res) => {
  console.log(req.param.avatarId);
  const {userId, hair_style, hair_color, skin_color, eyes_color, tops, bottoms, shoes,
    headwear, facial_hair, accessories} = req.body;

  const avatarId =  db.ref('users/'+ userId + '/avatar/').push().key;; 

  db.ref('users/'+ userId + '/avatar/'+ avatarId)
  .set(AVATAR(avatarId, hair_style, hair_color, skin_color, eyes_color, tops, bottoms, shoes,
    headwear, facial_hair, accessories)) 
    .then(() => {
    res.json({ avatarId : avatarId })   
  })
  .catch((err) => res.json({ error: err.message}));
   
});



// READ avatar
router.get('/:userId', (req, res) => {
const userId = req.params.userId;

  db.ref('users/' + userId + '/avatar').once('value')
  .then((data) => {
    if(data.val() != null) { res.json(data.val()); }
    else  { res.send("doesn't exist")}
  })
  .catch((err) => res.json({ err: err.message }));
});


// UPDATE an avatar
router.patch('/:users/:avatarId', server, (req, res) => {
  const {userId, avatarId} = req.params;
  const {hair_style, hair_color, skin_color, eyes_color, tops, bottoms, shoes,
    headwear, facial_hair, accessories} = req.body;

  db.ref('users/' + userId + '/avatar/' + avatarId).update(
    {
      hair_style: hair_style,
      hair_color: hair_color,
      skin_color: skin_color,
      eyes_color: eyes_color,
      tops: tops,
      bottoms: bottoms,
      shoes: shoes,
      headwear: headwear,
      facial_hair: facial_hair,
      accessories: accessories
    })
  .then(()=> res.json({status: 200, message: 'Successfully updated avatar' }))
  .catch((err) => res.json({error: err.message}))

});

// DELETE avatar
router.delete('/:users/:avatarId', (req, res) => {
  //console.log('avatarId:', req.params.avatarId);
  const {userId, avatarId} = req.params;

  db.ref('users/' + userId+ '/avatar/' + avatarId).remove()
  .then( ()=> res.json({status: 200, message: 'Successfully deleted avatar' }))
  .catch((err) => res.json({error: err.message}));
  
});


module.exports = router;

