var express = require("express");
var MongoClient=require("mongodb").MongoClient;
var url='mongodb://localhost/UserDB';
var db=MongoClient.connect(url,function(err,db){
        if(err)throw err;
});
var app = express();
var array=require("./arrayOfUsers");
var max=10;
var min=0;
app.get("", (req, res, next) => {
        var i=Math.round(min+Math.random()*(max-min+1));
        console.log("Случайное число="+i);
 res.json(array.arrayUsers[i].name);
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
