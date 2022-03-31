const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// get all users, sends json to front-end of the SQL table array
// ex response: [{username: user1, email: user1@email.com}, {...}]
router.get("/all", userController.getAllUsers, (req, res, next) => {
  return res.status(200).json(res.locals.getAllUsers);
});
// get one user
// either with /:id or specified in req.body
router.get("/:id", userController.getUser, (req, res, next) => {
  return res.status(200).json(res.locals.getUser);
});

router.get("/", userController.getUser, (req, res, next) => {
  return res.status(200).json(res.locals.getUser);
});


// create new user
router.post(
  "/",
  userController.getUser,
  userController.createUser,
  (req, res, next) => {
    return res.sendStatus(200);
  }
);

// update existing user
// username is required in the fetch url
router.put('/:id', userController.getUser, userController.updateUser, (req,res,next)=>{
    return res.sendStatus(200);
});

// delete a user
// either with /:id or specified in req.body
router.delete("/", userController.deleteUser, (req, res, next) => {
  return res.sendStatus(200);
});
router.delete("/:id", userController.deleteUser, (req, res, next) => {
  return res.sendStatus(200);
});

module.exports = router;
