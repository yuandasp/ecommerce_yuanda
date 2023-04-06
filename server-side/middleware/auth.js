const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  token = token.split(" ")[1];
  if (token == "null" || !token) {
    return res.status(401).send("Access Denied");
  }

  let verifiedUser = jwt.verify(token, "joe");
  console.log(verifiedUser);
  if (!verifiedUser) {
    return res.status(401).send("Access Denied");
  }

  req.user = verifiedUser;
  console.log(verifiedUser);
  next();
};

const checkRole = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(401).send("Access Denied, cause you're not Admin");
};

module.exports = { verifyToken, checkRole };
