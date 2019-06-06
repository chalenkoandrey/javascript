var express = require("express");
var router = express.Router();
var controller = require("./contoroller");
router.route("/users/")
  .post(controller.addUser)
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
router.route("/users/:id/requestFriend/:myid")
  .post(controller.addFriendsReqById)
router.route("/users/:id/acceptFriend/:myid")
  .post(controller.acceptFriendById)
router.route("/users/:id/deleteFriend/:myid")
  .delete(controller.deleteFriendById)
router.route("/users/:id/deleteRequest/:myid")
  .delete(controller.deleteFriendsReqById)
module.exports.Router = router