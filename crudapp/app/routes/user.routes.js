module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.get("/", users.showAllUsers);
  router.get("/add-user", users.addUser);
  router.post("/create-new-user", users.createNewUser);
  router.get("/edituser/:userId", users.editUser);
  router.post("/updateuser/:userId", users.updateUser);
  router.get("/deleteuser/:userId", users.deleteUser);

  app.use('/users', router);
};