const express = require('express');

const eventController = require('../controllers/eventController');

const router = express.Router();

// get one user saved event (may not be needed)
// router.get('');

// get all user saved events
// router.get('/', (req, res, next)=>{
//     return res.status(200).json();
// });

// // save a new event to user
// router.post('/', (req, res, next)=>{
//     return res.status(200).json();
// });

// // delete an event from user's save list
// router.delete('/', (req, res, next)=>{
//     return res.status(200).json();
// });

module.exports = router;