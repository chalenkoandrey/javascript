var mongoose = require("./mongoose").mongoose;
var Schema = mongoose.Schema;
var User = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  friends: { type: [String], required: true },
  friendsreqst: { type: [String], required: true }
});
var UserModel = mongoose.model('User', User);
module.exports.UserModel = UserModel;