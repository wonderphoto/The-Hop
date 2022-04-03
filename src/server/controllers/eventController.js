const db = require("../models/dataModels");
const pgp = require("pg-promise");

const eventController = {};

// get saved events for a particular user, returns the userid, eventid, and event details
eventController.getSavedEvents = async (req, res, next) => {
  try {
    // TODO change user id to be pulled from session instead from req.body
    const userid = req.session.user.userid;
    // const { userid } = req.body;

    // get data from user_events table and join with events table
    const sqlQuery = `
          SELECT *
          FROM user_events AS ue
          LEFT JOIN events AS e ON ue.eventid = e.eventid
          WHERE userid = $1
          ;`;

    const params = [userid];
    const data = await db.query(sqlQuery, params);

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
    const userid = "" + req.session.user.userid;

    //TODO fix userid and pull it from session instead of req body
    const {
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
    } = req.body;

    // check if the eventid is in the events table
    // if it's not we need to save to the events table
    const sqlQuery1 = `
      INSERT INTO events (eventid, title, category, labels, description,
      predicted_attendance, latitude, longitude, start_time,
      private, rank, local_rank)

      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)

      ON CONFLICT (eventid) DO NOTHING

      RETURNING eventid, title, category, labels, description,
      predicted_attendance, latitude, longitude, start_time,
      private, rank, local_rank
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

    const savedEvent = await db.query(sqlQuery1, params1);
    res.locals.savedEvent =
      savedEvent.rows.length > 0 ? savedEvent.rows[0] : "Duplicate event";
    console.log(savedEvent.rows);
    console.log("event is saved to events table");

    const checkQuery = `
      SELECT * FROM user_events
      WHERE userid = $1 AND eventid = $2
    `;
    const params2 = [userid, eventid];

    const checkUserEvent = await db.query(checkQuery, params2);
    // console.log(checkUserEvent.rows);
    if (checkUserEvent.rows.length > 0) return next();

    // if it exists, we just save to user_events table
    const sqlQuery2 =
      // `
      //   IF NOT EXISTS(SELECT 1 FROM user_events WHERE eventid = $2 AND userid = $1)
      `
      INSERT INTO user_events (userid, eventid)
      VALUES ($1, $2)
    ;`;

    const savedUserEvent = await db.query(sqlQuery2, params2);
    console.log("event is saved to user_events table");

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
    // TODO change user id to be pulled from session instead from req.body
    const userid = req.session.user.userid;
    const { eventid } = req.body;

    // delete from user_events table first
    // if there is no such eventid in the user_events table then we can delete that eventid from events,
    // where that eventid is not in user_events table
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
      "deleted event" + eventid + "from user: " + req.session.user.username
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
