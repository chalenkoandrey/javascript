var UserModel = require("./model").UserModel;
function addUser(req, res) {//add user to DataBase
  if (req.body.name && req.body.date) {
    var user = new UserModel({
      name: req.body.name,
      date: req.body.date
    });
    user.save()
      .then((result) => {
        res.json({ messege: "Add Ok", user: user });
      })
      .catch((error) => {
        res.send({ error: "Error add new user" + err });
      })
  }
  else {
    return res.send({ error: "Not full params" })
  }
}
async function showall(req, res) {//show all users in DataBase
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
  UserModel.findById(req.params.id)
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
    .then(async () => { showall(req, res) })
    .catch((error) => {
      res.send(error);
    })
}
function addFriendsReqById(req, res) {//send reqest to friend
  var toUser = req.params.id;
  var fromUser = req.params.myid;
  UserModel.findById(toUser)
    .exec()
    .then((user) => {
      if (!isFriend(user, fromUser)) {
        if (!isFriendRequset(user, fromUser)) {
          UserModel.findById(toUser)
            .exec()
            .then((user) => {
              user.friendsrequest.addToSet(fromUser);
              user.save()
              showById(req, res);
            })
            .catch((error) => {
              console.log(error);
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
  var toUser = req.params.id;
  var fromUser = req.params.myid;
  UserModel.findById(fromUser)
    .exec()
    .then((user) => {
      if (!isFriend(user, toUser)) {
        if (isFriendRequset(user, fromUser)) {
          user.friends.addToSet(toUser);
          user.friendsrequest.pull(toUser);
          user.save();
          UserModel.findById(toUser)
            .exec()
            .then((user) => {
              user.friends.addToSet(fromUser);
              user.friendsrequest.pull(fromUser);
              user.save();
              showById(req, res)
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
  var toUser = req.params.id;
  var fromUser = req.params.myid;
  UserModel.findById(fromUser)
    .exec()
    .then((user) => {
      if (isFriend(user, toUser)) {
        user.friends.pull(toUser);
        user.save();
        UserModel.findById(toUser)
          .exec()
          .then((user) => {
            user.friends.pull(fromUser);
            user.save();
            res.send({ result: "delete Ok" })
          })
          .catch((error) => {
            res.send(error);
          });
      }
      else {
        res.send("User with this id no friend");
      }
    })
    .catch((error) => {
      res.send(error);
    });
}
function deleteFriendsReqById(req, res) {//delete friends request
  var toUser = req.params.id;
  var fromUser = req.params.myid;
  UserModel.findById(fromUser)
    .exec()
    .then((user) => {
      if (isFriendRequset(user, toUser)) {
        user.friendsrequest.pull(toUser);
        user.save();
        showById(req, res);
      }
      else {
        res.send("No request with this id")
      }
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
module.exports = { addUser, showall, showById, deleteById, addFriendsReqById, acceptFriendById, deleteFriendById, deleteFriendsReqById };