const UserModel = require("./model").UserModel;
const jwt = require("jsonwebtoken")
function login(req, res) {
  const { name, password } = req.body;
  UserModel.findOne({ name: name })
    .exec()
    .then((user) => {
      if (!user.password.localeCompare(password))
        jwt.sign({ user: user.id, password: user.password }, "secret", { expiresIn: "1day" }, (err, token) => {
          res.json({
            token
          });
        });
      else {
        res.send("Error password")
      }
    })
}
function veryfyToken(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    req.token = token;
    jwt.verify(token, "secret", (err, authData) => {
      if (err) {
        res.send(err);
      }
      else {
        // console.log(authData);
        req.authData = authData;
        next();
      }
    })
  }
  else {
    res.send("No token")
  }
}
function addUser(req, res) {//add user to DataBase
  if (req.body.name && req.body.date && req.body.password) {
    var user = new UserModel({
      name: req.body.name,
      date: req.body.date,
      password: req.body.password
    });
    user.save()
      .then((result) => {
        res.json({ messege: "Add Ok", user: user });
      })
      .catch((error) => {
        res.send({ error: "Error add new user" + error });
      })
  }
  else {
    return res.send({ error: "Not full params" })
  }
}
function showall(req, res) {//show all users in DataBase
  UserModel.find()
    .exec()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.send(error);
    })
}
function showById(req, res) {//show user by id
  userId = req.params.id;
  UserModel.findById(userId)
    .exec()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.send(error);
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
      res.send(error);
    })
}
function addFriendsReqById(req, res) {//send reqest to friend
  const fromUserId = req.authData.user;
  console.log("UserId=" + fromUserId);
  var toUser = req.params.id;
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
              res.send(user);
            })
            .catch((error) => {
              res.send(error);
            });
        }
        else {
          res.send("Request already send")
        }
      }
      else {
        res.send("User alredy friend")
      }
    })
    .catch((error) => {
      res.send(error);
    });
}
function acceptFriendById(req, res) {//add user from friendsrequest to friends
  const fromUserId = req.authData.user;
  console.log("UserId=" + fromUserId);
  var toUser = req.params.id;
  var fromUser = req.params.myid;
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
  console.log("UserId=" + fromUserId);
  var toUser = req.params.id;
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
        res.send("User with this id no friend");
      }
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
}
function deleteFriendsReqById(req, res) {//delete friends request
  const fromUserId = req.authData.user;
  console.log("UserId=" + fromUserId);
  var toUser = req.params.id;
  UserModel.findById(fromUserId)
    .exec()
    .then((user) => {
      if (isFriendRequset(user, toUser)) {
        user.friendsrequest.pull(toUser);
        return user.save();
      }
      else {
        res.send("No request with this id")
      }
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
}
function isFriend(user, toUser) {
  return user.friends.includes(toUser);
}
function isFriendRequset(user, fromUser) {
  return user.friendsrequest.includes(fromUser);
}
module.exports = { veryfyToken, login, addUser, showall, showById, deleteById, addFriendsReqById, acceptFriendById, deleteFriendById, deleteFriendsReqById };