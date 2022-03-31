const express = require("express");

const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

const router = express.Router();

// responds with whether or not a user is logged in
router.get("/", (req, res) => {
  if (req.session.user && req.session.authenticated) {
    return res.send({ isLoggedIn: true, user: req.session.user });
  } else if(req.session.user){
    return;
  } else return res.send({ isLoggedIn: false });
});

router.post("/login", userController.getUser, sessionController.verifyUser, (req, res, next) => {
  return res.sendStatus(200);
});

// logout can be either delete or post, delete is preferred
router.post("/logout", sessionController.logout, (req, res, next) => {
    return res.sendStatus(200);
  });

router.delete("/logout", sessionController.logout, (req, res, next) => {
  return res.sendStatus(200);
});

module.exports = router;
