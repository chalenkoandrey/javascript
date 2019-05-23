var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
var mongoclient=new MongoClient(url,{native_parser:true});
var app = express();
app.use(express.urlencoded({extended: true}));
mongoclient.connect(function(err, client){
  if(err){
    return console.log(err);
  }
  var db=client.db("UserDB");
  const collection = db.collection("UserDB");
  app.post("/add", function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    if(req.body.id)
      {
        let user = {"id":req.body.id ,name:req.body.name,date:req.body.date};
        collection.insertOne(user, function(err, result){
          if(err){ 
            return console.log(err);
          }
      //console.log(result.ops);
        });
        collection.find().toArray(function(err,result){
          res.json(result);
        });
      }        
  });
  app.get("/show", (req, res, next) => {
    collection.find().toArray(function(err,result){
      res.json(result);
      });
  });
  app.delete("/delete", (req, res, next) => {
    collection.deleteOne({"id":req.body.id},function(err, result){
      if(err){ 
        return console.log(err);
      }
    }); 
    collection.find().toArray(function(err,result){
      res.json(result);
      });
    });
  app.listen(3000, () => {
    console.log("Server running on port 3000");
    });
});
