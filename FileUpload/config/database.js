const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => {
      console.log("Database Connected Successfully!");
    })
    .catch((err) => {
      console.error(err);
      console.log(err);
      process.exit(1);
    });
};
module.exports = dbConnect;
