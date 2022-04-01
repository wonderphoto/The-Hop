const db = require("../models/dataModels");
const pgp = require("pg-promise");

const eventController = {};

// get saved events for a particular user, returns the userid, eventid, and event details
eventController.getSavedEvents = async (req, res, next) => {
  try {
    const userid = req.session.user.userid;
    // get data from user_events table and join with events table
    const sqlQuery = `
          SELECT *
          FROM user_events AS ue
          WHERE userid = $1
          JOIN events AS e ON ue.eventid = e.eventid 
          ;`;

    const params = [userid];
    const data = await db.query(sqlQuery);

    res.locals.savedEvents = data.rows;

    return next();
  } catch (err) {
    return next({
      log: `Error in eventController.getSavedEvents : ${err}`,
      message: { err: "Error occurred in eventController.getSavedEvents" },
    });
  }
};
// save an event to a specific user
eventController.saveEvent = async (req, res, next) => {
  try {
    const userid = req.session.user.userid;
    const { eventid } = req.body;

    // check if the eventid is in the events table
    // if it's not we need to save to the events table
    const sqlQuery1 = `
        INSERT INTO events (eventid, title, category, labels, description,
    predicted_attendance, latitude, longitude, start_time,
    private, rank, local_rank)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      WHERE $1 NOT IN (SELECT eventid FROM events)
    `;

    // if it exists, we just save to user_events table
    const sqlQuery2 = `
          INSERT INTO user_events
          (userid, eventid)
          VALUES ($1, $2)
          ;`;

    const params1 = [
      eventid,
      title,
      category,
      labels,
      description,
      predicted_attendance,
      latitude,
      longitude,
      start_time,
      private,
      rank,
      local_rank,
    ];

    const params2 = [userid, eventid];

    const savedEvent = await db.query(sqlQuery, params1);
    console.log("event is saved in events", eventid);
    const savedUserEvent = await db.query(sqlQuery, params2);

    console.log("saved event is: ", title);
    return next();
  } catch (err) {
    return next({
      log: `Error in eventController.saveEvent : ${err}`,
      message: { err: "Error occurred in eventController.saveEvent" },
    });
  }
};

eventController.deleteEvent = async (req, res, next) => {
  try {
    const userid = req.session.user.userid;
    const { eventid } = req.body;

    // delete from user_events table first
    // if there is no such eventid in the user_events table then we can delete that eventid from events, where that eventid is not in user_events table

    const sqlQuery = `
            DELETE from user_events 
            WHERE userid = $1 AND eventid = $2
            ;`;

    const sqlQuery2 = `
            DELETE from events
            WHERE eventid NOT IN (SELECT eventid FROM user_events)
        `;

    const params = [userid, eventid];
    const deletedEvent = await db.query(sqlQuery, params);
    const deletedEvent2 = await db.query(sqlQuery2);

    console.log(
      `deleted event is: , ${deletedEvent} from user_events table and ${deletedEvent2} from events table`
    );

    return next();
  } catch (err) {
    return next({
      log: `Error in eventController.deleteEvent : ${err}`,
      message: { err: "Error occurred in eventController.deleteEvent" },
    });
  }
};

module.exports = eventController;
