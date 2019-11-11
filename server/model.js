const mongoose = require("./mongoose").mongoose;
const Schema = mongoose.Schema;
const User = new Schema({
  password: { type: String },
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  friends: { type: [String], required: true },
  friendsrequest: { type: [String], required: true, }
});
const UserModel = mongoose.model('User', User);
module.exports.UserModel = UserModel;