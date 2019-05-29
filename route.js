var express = require("express");
var router = express.Router();
var controller = require("./contoroller");
router.route("/users/")
  .post(controller.addUser)
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
module.exports.Router = router