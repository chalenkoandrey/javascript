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
module.exports.mongoose = mongoose;