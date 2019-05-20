var path = require('path');
var express = require("express");
var app = express();
var array=require("./arrayOfUsers");
var max=10;
var min=0;
app.get("", (req, res, next) => {
        var i=Math.round(min+Math.random()*(max-min+1));
        console.log("Случайное число"+i);
 res.json(array.arrayUsers[i].name);
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
