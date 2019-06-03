var express = require("express");
var router = express.Router();
var controller = require("./contoroller");
router.route("/users/")
  .post(controller.addUser)
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
router.route("/users/:id/addRequest/:myid")
  .post(controller.addFriendsReqById)
router.route("/users/:id/addFriend/:myid")
  .post(controller.addFriendsById)
router.route("/users/:id/deleteFriend/:myid")
  .delete(controller.deleteFriendsById)
router.route("/users/:id/deleteRequest/:myid")
  .delete(controller.deleteFriendsReqById)
module.exports.Router = router