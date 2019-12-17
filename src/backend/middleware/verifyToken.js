const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // Check for value of authorization property in req handler
  let tokenWithBearer = req.headers["authorization"];

  //   if value of authorization is found, remove first 7 chars ("Bearer ") from value
  if (tokenWithBearer.startsWith("Bearer ")) {
    let token = tokenWithBearer.slice(7, tokenWithBearer.length);
    jwt.verify(token, "wasim", (err, decoded) => {
      if (err) {
        return res.json({ message: "Please Re-Login..." });
      } else {
        next();
      }
    });
  }
};
module.exports = checkAuth;
