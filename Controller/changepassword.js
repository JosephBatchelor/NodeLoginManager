const User = require("../Model/users.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../MiddleWare/authtoken.js");
const { secretKey } = require("../config");

exports.post_changepassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  // Get the user ID from the token
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, secretKey);
  const userId = decodedToken.userId;

  // Find the user in the database
  User.findById(userId, (error, user) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else if (!user) {
      res.status(401).send("Invalid token");
    } else if (user.password !== old_password) {
      res.status(401).send("Invalid old password");
    } else {
      // Update the user's password
      user.password = new_password;
      user.save((error) => {
        if (error) {
          console.error(error);
          res.status(500).send("Server error");
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
};
