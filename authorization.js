const jwt = require("jsonwebtoken");
const UserModel = require("./model").UserModel;
function login(req, res) {
  const { name, password } = req.body;
  UserModel.findOne({ name: name })
    .exec()
    .then((user) => {
      const hexPassword = Buffer(password).toString('hex');
      if (!hexPassword.localeCompare(user.password))
        jwt.sign({ user: user.id }, "secret", { expiresIn: "1day" }, (err, token) => {
          res.json({
            token
          });
        });
      else {
        res
          .status(401)
          .send("Error password");
      }
    })
    .catch((error) => {
      res
        .status(404)
        .send("No User in Database")
    })
}
function veryfyAuthorization(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    req.token = token;
    jwt.verify(token, "secret", (err, authData) => {
      if (err) {
        res
          .status(401)
          .send(err);
      }
      else {
        req.authData = authData;
        next();
      }
    })
  }
  else {
    res
      .status(400)
      .send("No token")
  }
}
module.exports = { login, veryfyAuthorization }