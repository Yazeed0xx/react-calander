const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informationSchema = new Schema({
  person: {
    type: String,
    required: true,
  },
  second: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const info = mongoose.models.info || mongoose.model("info", informationSchema);

module.exports = info;
