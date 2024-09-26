// import mongoose, { Schema, models } from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema();
const models = mongoose.models();

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

export const info = mongoose.model("info", informationSchema);
