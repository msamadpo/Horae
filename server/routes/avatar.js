const express = require('express');

const router = express.Router();

// CREATE an avatar
router.post('/', (req, res) => {
  res.send(`POST request to ${req.baseUrl}`);
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
