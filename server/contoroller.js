const UserModel = require("./model").UserModel;
function showall(req, res) {//show all users in DataBase
  UserModel.find()
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ result });
    })
    .catch((error) => {
      res
        .status(502)
        .send(error);
    })
}
function showById(req, res) {//show user by id
  var userIdForShow = req.params.id;
  UserModel.findById(userIdForShow)
    .exec()
    .then((result) => {
      if (result != null) {
        res.json({ result });
      }
      else {
        res
          .status(404)
          .send("No user with this Id");
      }
    })
    .catch((error) => {
      res
        .status(502)
        .send(error);
    })
}
function deleteById(req, res) {//delete user from DataBase
  var userIdForDelete = req.params.id;
  UserModel.findByIdAndDelete(userIdForDelete)
    .exec()
    .then((user) => {
      return user.remove();
    })
    .then(() => {
      showall(req, res)
    })
    .catch((error) => {
      res
        .status(500)
        .send(error);
    })
}
function addFriendsReqById(req, res) {//send reqest to friend
  const authorizedUserId = req.authData.user;
  const reqToUser = req.params.id;
  UserModel.findById(reqToUser)
    .exec()
    .then((user) => {
      if (!isFriend(user, authorizedUserId)) {
        if (!isFriendRequset(user, authorizedUserId)) {
          user.friendsrequest.addToSet(authorizedUserId);
          return user.save()
        }
        else {
          res
            .status(406)
            .send("Request already send")
        }
      }
      else {
        res
          .status(406)
          .send("User alredy friend")
      }
    })
    .then((user) => {
      res
        .status(202)
        .send(user);
    })
    .catch((error) => {
      res
        .status(404)
        .send(error);
    });
}
function acceptFriendById(req, res) {//add user from friendsrequest to friends
  const authorizedUserId = req.authData.user;
  const reqFromUser = req.params.id;
  UserModel.findById(authorizedUserId)
    .exec()
    .then((user) => {
      if (!isFriend(user, reqFromUser)) {
        if (isFriendRequset(user, reqFromUser)) {
          user.friends.addToSet(reqFromUser);
          user.friendsrequest.pull(reqFromUser);
          user.save();
          UserModel.findById(reqFromUser)
            .exec()
            .then((user) => {
              user.friends.addToSet(authorizedUserId);
              user.friendsrequest.pull(authorizedUserId);
              return user.save();
            })
            .then((user) => {
              res.send(user);
            })
            .catch((error) => {
              res.send(error);
            });
        }
        else {
          res
            .status(424)
            .send("No request friend");
        }
      }
      else {
        res
          .status(422)
          .send("User alredy friend");
      }
    })
    .catch((error) => {
      res.send({ "error": error });
    });
}
function deleteFriendById(req, res) {//delete friends by id
  const authorizedUserId = req.authData.user;
  const userIdForDelete = req.params.id;
  UserModel.findById(authorizedUserId)
    .exec()
    .then((user) => {
      if (isFriend(user, userIdForDelete)) {
        user.friends.pull(userIdForDelete);
        user.save();
        UserModel.findById(userIdForDelete)
          .exec()
          .then((user) => {
            user.friends.pull(authorizedUserId);
            return user.save();
          })
          .catch((error) => {
            res.send(error);
          });
      }
      else {
        res
          .status(400)
          .send("User with this id no friend");
      }
    })
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((error) => {
      res
        .status(500)
        .send(error);
    });
}
function deleteFriendsReqById(req, res) {//delete friends request
  const authorizedUserId = req.authData.user;
  const userIdForDelete = req.params.id;
  UserModel.findById(authorizedUserId)
    .exec()
    .then((user) => {
      if (isFriendRequset(user, userIdForDelete)) {
        user.friendsrequest.pull(userIdForDelete);
        return user.save();
      }
      else {
        res
          .status(404)
          .send("No request with this id")
      }
    })
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((error) => {
      res
        .status(500)
        .send(error);
    });
}
function isFriend(user, fromUser) {
  return user.friends.includes(fromUser);
}
function isFriendRequset(user, fromUser) {
  return user.friendsrequest.includes(fromUser);
}
function showByToken(req, res) {
  console.log(req)
  const authorizedUserId = req.authData.user;
  UserModel.findById(authorizedUserId)
    .then((user) => {
      res
        .status(202)
        .send(user)
    })
}
module.exports = {
  showall, showById, deleteById, showByToken,
  addFriendsReqById, acceptFriendById, deleteFriendById, deleteFriendsReqById
};