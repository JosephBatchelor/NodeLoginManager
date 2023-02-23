const User = require("../Model/users.js");

exports.post_register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email already exist in the database
  User.findOne({ $or: [{ username }, { email }] }, (error, user) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else if (user) {
      const conflictField = user.username === username ? "username" : "email";
      res.status(409).send(`${conflictField} already exists`);
    } else {
      // Create a new user document
      const newUser = new User({ username, email, password });

      // Save the new user document to the database
      newUser.save((error) => {
        if (error) {
          console.error(error);
          res.status(500).send("Server error");
        } else {
          // Return a 204 No Content response
          res.sendStatus(204);
        }
      });
    }
  });
};
