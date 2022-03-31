const db = require("../models/dataModels");
const bcrypt = require("bcrypt");

const sessionController = {}

sessionController.verifyUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const sqlQuery = `
            SELECT password
            FROM users
            WHERE username = $1
            ;`;
  
      const params = [username];
  
      const retrievedPassword = await db.query(sqlQuery, params);
  
      console.log("database hash is: ", retrievedPassword.rows[0].password);
  
      let verification = bcrypt.compareSync(
        password,
        retrievedPassword.rows[0].password
      );
      console.log("result of verification is: ", verification);
      res.locals.verifyUser = verification;
  
      req.session.authenticated = true;
      req.session.user = res.locals.user;
  
      console.log("verifyUser complete, result is: ", res.locals.verifyUser);
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.verifyUser : ${err}`,
        message: { err: "Error occurred in userController.verifyUser" },
      });
    }
  };
  