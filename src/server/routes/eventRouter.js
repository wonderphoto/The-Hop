const express = require('express');

const eventController = require('../controllers/eventController');

const router = express.Router();

// get one user saved event (may not be needed)
// router.get('');

// get all user saved events
router.get('/',
    eventController.getSavedEvents,
    (req, res, next) => {
        return res.status(200).json(res.locals.savedEvents);
    });

// save a new event to events
router.post('/',
    eventController.saveEvent,
    (req, res, next) => {
        return res.status(200).json('event is saved for this user');
    });

// // delete an event from user's save list
router.delete('/',
    eventController.deleteEvent,
    (req, res, next) => {
        return res.status(200).json('event deleted successfully');
    });

module.exports = router;
