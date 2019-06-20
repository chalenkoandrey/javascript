const express = require("express");
let router = express.Router();
const controller = require("./contoroller");
router.route("/login")
  .post(controller.login)
router.route("/registration")
  .post(controller.registration)
router.route("/users/")
  .post(controller.addUser)
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
router.route("/users/:id/requestFriend/")
  .post(controller.veryfyToken, controller.addFriendsReqById)
router.route("/users/:id/acceptFriend/")
  .post(controller.veryfyToken, controller.acceptFriendById)
router.route("/users/:id/deleteFriend/")
  .delete(controller.veryfyToken, controller.deleteFriendById)
router.route("/users/:id/deleteRequest/")
  .delete(controller.veryfyToken, controller.deleteFriendsReqById)
module.exports.Router = router