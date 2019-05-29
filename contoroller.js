var UserModel = require("./model").UserModel;
function addUser(req, res) {
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
function showall(req, res) {
  UserModel.find()
    .exec()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.send(error);
    })
}
function showById(req, res) {
  UserModel.findById(req.params.id)
    .exec()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => {
      res.send(error);
    })
}
function deleteById(req, res) {
  UserModel.findByIdAndDelete(req.params.id)
    .exec()
    .then(showall(req, res))
    .catch((error) => {
      res.send(error);
    })
}
module.exports = { addUser, showall, showById, deleteById };