const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Person = mongoose.model("person", PersonSchema);
