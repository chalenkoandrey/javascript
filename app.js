var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongoclient = new MongoClient(url, { useNewUrlParser: true });
var app = express();
app.use(express.urlencoded({ extended: true }));
mongoclient.connect(function (err, client) {
  if (err) {
    return 1;
  }
  var db = client.db("UserDB");
  const collection = db.collection("UserDB");
  app.post("/add", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.body.id && req.body.name && req.body.date) {
      let user = { "id": req.body.id, name: req.body.name, date: req.body.date };
      collection.insertOne(user, function (err, result) {
        if (err) {
          res.send({ error: "Error add new user" + err });
        }
        else {
          collection.find().toArray(function (err, result) {
            return res.json({ messege: "Add Ok", result });
          });
        }
      });
    }
    else {
      return res.send({ error: "Not full params" })
    }
  });
  app.get("/show", (req, res, next) => {
    collection.find().toArray(function (err, result) {
      return res.json(result);
    });
  });
  app.delete("/delete", (req, res, next) => {
    collection.find({ "id": req.body.id }).toArray(function (err, result) {
      ;
      if (!result[0]) {
        return res.send({ error: "No many user with whis id" });
      }
      else {
        collection.deleteMany({ "id": req.body.id });
        collection.find().toArray(function (err, result) {
          return res.json(result);
        });
      }
    });

  });
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});