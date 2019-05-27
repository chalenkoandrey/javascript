var express = require('express');
var router = express.Router();
var UserModel = require("./model").UserModel;
router.post("/user/", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (req.body.name && req.body.date) {
    var user = new UserModel({
      name: req.body.name,
      date: req.body.date
    });
    return user.save(function (err) {
      if (err) {
        res.send({ error: "Error add new user" + err });
      }
      else {
        res.json({ messege: "Add Ok", user: user });
      }
    });
  }
  else {
    return res.send({ error: "Not full params" })
  }
});
router.get("/user/", (req, res, next) => {
  return UserModel.find(function (err, result) {
    res.json({ result });
  })
});
router.get("/user/:id", (req, res, next) => {
  return UserModel.findById(req.params.id, function (err, result) {
    res.json({ result });
  })
});
router.delete("/user/:id", (req, res, next) => {
  return UserModel.findByIdAndDelete(req.params.id, function (err, result) {
    UserModel.find(function (err, result) {
      res.json({ result });
    });
  });
});
module.exports.router = router;
