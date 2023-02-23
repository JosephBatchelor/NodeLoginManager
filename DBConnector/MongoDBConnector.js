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
