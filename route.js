const express = require("express");
let router = express.Router();
const controller = require("./contoroller");
router.route("/login")
  .post(controller.login)
router.route("/users/")
  .post(controller.addUser)
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
router.route("/users/:id/requestFriend/:myid")
  .post(controller.veryfyToken, controller.addFriendsReqById)
router.route("/users/:id/acceptFriend/:myid")
  .post(controller.veryfyToken, controller.acceptFriendById)
router.route("/users/:id/deleteFriend/:myid")
  .delete(controller.veryfyToken, controller.deleteFriendById)
router.route("/users/:id/deleteRequest/:myid")
  .delete(controller.veryfyToken, controller.deleteFriendsReqById)
module.exports.Router = router