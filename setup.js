var url = "mongodb://localhost:27017/UserDB";
var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', function (error) {
  console.log(error);
});
db.once('open', function () {
  console.info("Connected to DB");
})
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
module.exports = {
  mongoose: mongoose,
  app: app
};