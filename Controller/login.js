const User = require("../Model/users.js");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config.js");

exports.post_login = async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database and the password matches
  User.findOne({ username, password }, (error, user) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else if (!user) {
      res.status(401).send("Invalid username or password");
    } else {
      // Generate a JWT token with the user ID as the payload
      const token = jwt.sign({ userId: user._id }, secretKey);

      // Return the access token
      res.json({ token });
    }
  });
};
