module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.get("/", users.showAllUsers);
  //console.log(va);
  router.get("/add-user", users.addUser);
  router.post("/create-new-user", users.createNewUser);
  router.get("/edituser/:userId", users.editUser);
  router.post("/updateuser/:userId", users.updateUser);
  router.get("/deleteuser/:userId", users.deleteUser);

  /*router.post("/", users.create);
  router.get("/published", users.findAllPublished);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);*/

  app.use('/users', router);
};