const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connect to mongodb successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("err connection ", err);
  });
};
module.exports = connectDB;
