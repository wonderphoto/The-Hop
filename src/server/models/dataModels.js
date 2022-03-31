require('dotenv').config();
const { Pool } = require('pg');

const PG_URI = `postgres://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@heffalump.db.elephantsql.com/${process.env.POSTGRESQL_USER}`;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// CREATE TABLE users (
// userid SERIAL PRIMARY KEY,
// username VARCHAR,
// password VARCHAR,
// home_location VARCHAR DEFAULT NULL,
// email VARCHAR DEFAULT NULL
// ) 

// CREATE TABLE events (
// eventid VARCHAR PRIMARY KEY,
// title VARCHAR,
// category VARCHAR(50),
// labels VARCHAR,
// description VARCHAR, 
// predicted_attendance INTEGER, 
// latitude NUMERIC(11, 8),
// longitude NUMERIC(11, 8),
// start_time TIMESTAMP,
// private VARCHAR(50),
// rank INTEGER,
// local_rank INTEGER
// )

// CREATE TABLE user_events(
//  user_event_id SERIAL PRIMARY KEY,
//  userid INTEGER,
//  eventid VARCHAR
// )


module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
  