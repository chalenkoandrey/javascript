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
function isUserAuthorized(req, res, next) {
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
      .status(403)
      .send("No token")
  }
}
function registration(req, res) {
  if (req.body.name && req.body.date && req.body.password) {
    let user = new UserModel({
      name: req.body.name,
      date: req.body.date,
      password: Buffer(req.body.password).toString('hex')
    });
    user.save()
      .then(() => {
        jwt.sign({ user: user.id, password: user.password }, "secret", { expiresIn: "1day" }, (err, token) => {
          res
            .status(201)
            .json({
              token
            });
        });
      })
      .catch((error) => {
        res
          .status(502)
          .send({ error: "Error add new user" + error });
      })
  }
  else {
    return res
      .status(449)
      .send({ error: "Not full params" });
  }
}
module.exports = { login, isUserAuthorized, registration }