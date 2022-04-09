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
        return res.status(200).json(res.locals.savedEvent);
    });

// // delete an event from user's save list
router.delete('/',
    eventController.deleteEvent,
    (req, res, next) => {
        return res.status(200).json(`deleted event ${req.body.eventid} from user ${req.body.username}`);
    });

module.exports = router;
