const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://root:hjns93rNTWEIJhuW@assessmentapi.eykez2w.mongodb.net/users?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

// Define the User model schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user-credentials", userSchema);

module.exports = User;
