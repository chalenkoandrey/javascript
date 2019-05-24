var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
var UserModel = require("./route").UserModel;
app.post("/user/", function (req, res) {
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
app.get("/user/", (req, res, next) => {
  return UserModel.find(function (err, result) {
    res.json({ result });
  })
});
app.get("/user/:id", (req, res, next) => {
  return UserModel.findById(req.params.id, function (err, result) {
    res.json({ result });
  })
});
app.delete("/user/:id", (req, res, next) => {
  return UserModel.findByIdAndDelete(req.params.id, function (err, result) {
    UserModel.find(function (err, result) {
      res.json({ result });
    });
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});