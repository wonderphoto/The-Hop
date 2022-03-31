const db = require("../models/dataModels");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userController = {};

// if no id exists in the fetch url (/:id), then use req.body
userController.getUser = async (req, res, next) => {
  try {
    const username = req.params.id ? req.params.id : req.body.username;

    if (!username) {
      return next("Missing username in userController.getUser");
    }

    const sqlQuery = `
          SELECT username, email, home_location FROM users 
          WHERE username = $1
              `;

    const params = [username];

    const data = await db.query(sqlQuery, params);

    res.locals.getUser = data.rows[0] ? data.rows[0] : null;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getUser : ${err}`,
      message: { err: "Error occurred in userController.getUser" },
    });
  }
};

userController.getAllUsers = async (req, res, next) => {
  try {
    const sqlQuery = `
            SELECT username, email, home_location FROM users 
                `;
                
    const data = await db.query(sqlQuery);

    res.locals.getAllUsers = data.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getAllUsers : ${err}`,
      message: { err: "Error occurred in userController.getAllUsers" },
    });
  }
};

userController.createUser = async (req, res, next) => {
  if (res.locals.getUser) {
    return next({
      log: `Error in userController.createUser`,
      message: { err: "This username is already in use." },
      status: 401,
    });
  }
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return next("Missing username or password in userController.createUser");
    }
    const sqlQuery = !email
      ? `
        INSERT INTO users (username, password)
        VALUES ($1, $2) ON CONFLICT DO NOTHING
            `
      : `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3) ON CONFLICT DO NOTHING
            `;

    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    let hash = bcrypt.hashSync(password, salt);

    console.log("hashed password is:", hash);
    const params = !email ? [username, hash] : [username, hash, email];

    const data = await db.query(sqlQuery, params);
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser : ${err}`,
      message: { err: "Error occurred in userController.createUser" },
    });
  }
};

// if no id exists in the fetch url (/:id), then use req.body
userController.deleteUser = async (req, res, next) => {
  try {
    const username  = req.params.id ? req.params.id : req.body.username;
    const sqlQuery = `
            DELETE 
            FROM users
            WHERE username = $1
            ;`;

    const params = [username];
    const deletedUser = await db.query(sqlQuery, params);

    console.log("deleted user is: ", username);
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.deleteUser : ${err}`,
      message: { err: "Error occurred in userController.deleteUser" },
    });
  }
};

module.exports = userController;
