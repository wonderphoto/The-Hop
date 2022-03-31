const express = require("express");

const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user && req.session.authenticated) {
    return res.send({ isLoggedIn: true, user: req.session.user });
  } else if(req.session.user){
    return;
  } else return res.send({ isLoggedIn: false });
});

router.post("/login", sessionController.verifyUser, (req, res, next) => {
  return res.status(200);
});

router.post("/logout", sessionController.logout, (req, res, next) => {
  return res.status(200);
});

module.exports = router;
