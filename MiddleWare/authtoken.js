const jwt = require("jsonwebtoken");
const { secretKey } = require("../config.js");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Missing authorization header");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Missing authorization token");
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid authorization token");
  }
};
