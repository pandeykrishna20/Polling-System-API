const express = require("express");
const app = express();

const port = 8000;
// import database connection file
const db = require("./config/mongoose");

// add middleware for parse data from body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import routes
app.use("/", require("./routes/question.js"));
app.use("/", require("./routes/option.js"));

app.listen(port, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log(`Server is running on ${port}`);
  }
});
