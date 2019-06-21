const express = require("express");
let router = express.Router();
const controller = require("./contoroller");
const authorization = require("./authorization");
router.route("/login/")
  .post(authorization.login)
router.route("/registration/")
  .post(controller.registration)
router.route("/users/")
  .get(controller.showall);
router.route("/users/:id")
  .get(controller.showById)
  .delete(controller.deleteById);
router.route("/users/:id/requestFriend/")
  .post(authorization.veryfyAuthorization, controller.addFriendsReqById)
router.route("/users/:id/acceptFriend/")
  .post(authorization.veryfyAuthorization, controller.acceptFriendById)
router.route("/users/:id/deleteFriend/")
  .delete(authorization.veryfyAuthorization, controller.deleteFriendById)
router.route("/users/:id/deleteRequest/")
  .delete(authorization.veryfyAuthorization, controller.deleteFriendsReqById)
module.exports.Router = router