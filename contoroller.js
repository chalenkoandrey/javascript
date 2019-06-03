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
    .then(showall(req, res))
    .catch((error) => {
      res.send(error);
    })
}
function addFriendsReqById(req, res) {//send reqest to friend
  UserModel.findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user.friends.includes(req.params.myid)) {
        UserModel.findByIdAndUpdate(req.params.id, { $addToSet: { friendsreqst: req.params.myid } })
          .exec()
          .then(showById(req, res))
          .catch((error) => {
            res.send(error);
          });
      }
      else {
        res.send("User alredy friend")
      }
    })
    .catch((error) => {
      res.send(error);
    });
}
function addFriendsById(req, res) {//add user from friendsrequest to friends
  UserModel.findById(req.params.myid)
    .exec()
    .then((user) => {
      if (user.friends.indexOf(req.params.id) < 0) {
        if (user.friendsreqst.indexOf(req.params.id) >= 0) {
          user.update({ $addToSet: { friends: req.params.id }, $pull: { friendsreqst: req.params.id } })
          UserModel.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.myid }, $pull: { friendsreqst: req.params.myid } })
            .exec()
            .then(showById(req, res))
            .catch((error) => {
              res.send(error);
            });
        }
        else {
          res.send("No req friend");
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
function deleteFriendsById(req, res) {//delete friends by id
  UserModel.findByIdAndUpdate(req.params.myid, { $pull: { friends: req.params.id } })
    .exec()
    .then(() => {
      UserModel.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.myid } })
        .exec()
        .then(() => {
          res.send({ result: "delete Ok" })
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .catch((error) => {
      res.send(error);
    });

}
function deleteFriendsReqById(req, res) {//delete friends request
  UserModel.findByIdAndUpdate(req.params.myid, { $pull: { friendsreqst: req.params.id } })
    .exec()
    .then(showById(req, res))
    .catch((error) => {
      res.send(error);
    });
}
module.exports = { addUser, showall, showById, deleteById, addFriendsReqById, addFriendsById, deleteFriendsById, deleteFriendsReqById };