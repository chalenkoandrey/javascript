const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const router = require("./route").Router;
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
