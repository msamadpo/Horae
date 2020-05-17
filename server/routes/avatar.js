const express = require('express');
const router = express.Router();
const firebase = require('../server');

const AVATAR = {
  avatarId: '442717c4195c1dd2b931',
  hair : {
    color: 'grey',
    style: 'afro'
  },
  skin_color: 'white',
  eyes_color: 'brown',
  tops: 'plaid shirt',
  bottoms: 'jeans',
  shoes: 'sneakers',
  headwear: 'hat',
  facial_hair: 'mustache',
  accessories: 'book',
};


function writeAvatarData() {
  firebase.database.ref('avatar/').push().set(AVATAR);
}

// CREATE an avatar
router.post('/', (req, res) => {
  res.send(`POST request to ${req.baseUrl}`);
});

//READ an avatar
router.get('/', (req, res) => {
  res.json(AVATAR);
});

// READ avatar
router.get('/', (req, res) => {
  res.send(`GET request to ${req.baseUrl}`);
});

// UPDATE avatar
router.patch('/:avatarId', (req, res) => {
  console.log('avatarId:', req.params.avatarId);
  res.send(`PATCH request to ${req.baseUrl}`);
});

// DELETE avatar
router.delete('/', (req, res) => {
  res.send(`DELETE request to ${req.baseUrl}`);
});

module.exports = router;
module.exports.avatar = AVATAR;
module.exports.createAvatar = writeAvatarData;

