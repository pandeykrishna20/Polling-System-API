const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/PollingSystem_Api").then(() => {
  console.log("database successfully connected");
});
