var express = require("express");
var app = express();
var router = require("./route").Router;;
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
