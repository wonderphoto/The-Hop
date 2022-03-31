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
    const sqlQuery = `SELECT username, email, home_location FROM users`;
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

userController.updateUser = async (req, res, next) => {
  if (!res.locals.getUser) {
    return next("This user does not exist");
  }
  if (!req.body.username && !req.body.newPassword && !req.body.email) {
    return next("At least one field is required to update");
  }

  try {
    const passQuery = `
      SELECT password FROM users
      WHERE username = $1
    `;
    let dbPassword;
    await db.query(passQuery, [req.params.id]).then((data) => {
      dbPassword = data.rows[0].password;
    });

    const password = req.body.password ? req.body.password: null;
    const newPassword = req.body.newPassword ? req.body.newPassword : null;
    const email = req.body.email ? req.body.email : null;
    const newUsername = req.body.newUsername ? req.body.newUsername: null;
    const username = req.params.id;

    if (password && newPassword) {
      let verification = bcrypt.compareSync(
        password,
        dbPassword
      );

      if(!verification) return next("Invalid old password");
      
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const hash = bcrypt.hashSync(newPassword, salt);
      const params = [username, newPassword];
      let updateQuery = `
        UPDATE users
        SET password = $2
        WHERE username = $1
      `;
      await db.query(updateQuery, params).then(() => {
        console.log("Password has been updated.");
      });
    }

    const newUser = res.locals.getUser;

    if (email) {
      const params = [username, email];
      let updateQuery = `
        UPDATE users
        SET email = $2
        WHERE username = $1
      `;
      await db.query(updateQuery, params).then(() => {
        console.log("Email has been updated.");
        newUser.email = email;
        req.session.user = newUser;
      });
    }
    if (newUsername) {
      const params = [username, newUsername];
      let updateQuery = `
        UPDATE users
        SET username = $2
        WHERE username = $1
      `;
      await db.query(updateQuery, params).then(() => {
        console.log("Username has been updated.");
        newUser.username = newUsername;
        req.session.user = newUser;
      });
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.updateUser : ${err}`,
      message: { err: "Error occurred in userController.updateUser" },
    });
  }
};

// if no id exists in the fetch url (/:id), then use req.body
userController.deleteUser = async (req, res, next) => {
  try {
    const username = req.params.id ? req.params.id : req.body.username;
    const sqlQuery = `
            DELETE 
            FROM users
            WHERE username = $1
            ;`;

    const params = [username];
    const deletedUser = await db.query(sqlQuery, params);

    console.log("deleted user:  ", username);
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.deleteUser : ${err}`,
      message: { err: "Error occurred in userController.deleteUser" },
    });
  }
};

module.exports = userController;
