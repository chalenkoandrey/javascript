const UserModel = require("./model").UserModel;
const jwt = require("jsonwebtoken")
function registration(req, res) {
  if (req.body.name && req.body.date && req.body.password) {
    let user = new UserModel({
      name: req.body.name,
      date: req.body.date,
      password: Buffer(req.body.password).toString('hex')
    });
    user.save()
      .then((result) => {
        jwt.sign({ user: user.id, password: user.password }, "secret", { expiresIn: "1day" }, (err, token) => {
          res
            .status(201)
            .json({
              token
            });
        });
      })
      .catch((error) => {
        res
          .status(400)
          .send({ error: "Error add new user" + error });
      })
  }
  else {
    return res
      .status(416)
      .send({ error: "Not full params" });
  }
}
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
        .status(500)
        .send(error);
    })
}
function showById(req, res) {//show user by id
  var userId = req.params.id;
  UserModel.findById(userId)
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
        .status(500)
        .send(error);
    })
}
function deleteById(req, res) {//delete user from DataBase
  UserModel.findByIdAndDelete(req.params.id)
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
  const fromUserId = req.authData.user;
  const toUser = req.params.id;
  UserModel.findById(toUser)
    .exec()
    .then((user) => {
      if (!isFriend(user, fromUserId)) {
        if (!isFriendRequset(user, fromUserId)) {
          UserModel.findById(toUser)
            .exec()
            .then((user) => {
              user.friendsrequest.addToSet(fromUserId);
              return user.save()
            })
            .then((user) => {
              res
                .status(202)
                .send(user);
            })
            .catch((error) => {
              res
                .status(400)
                .send(error);
            });
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
    .catch((error) => {
      res
        .status(404)
        .send(error);
    });
}
function acceptFriendById(req, res) {//add user from friendsrequest to friends
  const fromUserId = req.authData.user;
  const toUser = req.params.id;
  UserModel.findById(fromUser)
    .exec()
    .then((user) => {
      if (!isFriend(user, toUser)) {
        if (isFriendRequset(user, fromUserId)) {
          user.friends.addToSet(toUser);
          user.friendsrequest.pull(toUser);
          user.save();
          UserModel.findById(toUser)
            .exec()
            .then((user) => {
              user.friends.addToSet(fromUserId);
              user.friendsrequest.pull(fromUserId);
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
          res.send("No request friend");
        }
      }
      else {
        res.send("User alredy friend");
      }
    })
    .catch((error) => {
      res.send({ "error": error });
    });
}
function deleteFriendById(req, res) {//delete friends by id
  const fromUserId = req.authData.user;
  const toUser = req.params.id;
  UserModel.findById(fromUserId)
    .exec()
    .then((user) => {
      if (isFriend(user, toUser)) {
        user.friends.pull(toUser);
        user.save();
        UserModel.findById(toUser)
          .exec()
          .then((user) => {
            user.friends.pull(fromUserId);
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
  const fromUserId = req.authData.user;
  const toUser = req.params.id;
  UserModel.findById(fromUserId)
    .exec()
    .then((user) => {
      if (isFriendRequset(user, toUser)) {
        user.friendsrequest.pull(toUser);
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
function isFriend(user, toUser) {
  return user.friends.includes(toUser);
}
function isFriendRequset(user, fromUser) {
  return user.friendsrequest.includes(fromUser);
}
module.exports = {
  registration, showall, showById, deleteById,
  addFriendsReqById, acceptFriendById, deleteFriendById, deleteFriendsReqById
};