var app = require("./setup").app;
var router=require('./route').router
app.use(router);
module.exports.app = app;