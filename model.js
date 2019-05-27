var mongoose = require("./setup").mongoose;
var Schema = mongoose.Schema;
var User = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true }
});
var UserModel = mongoose.model('User', User);
module.exports.UserModel = UserModel;