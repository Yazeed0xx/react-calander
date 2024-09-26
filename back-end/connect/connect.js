import { log } from "console";
import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected succs");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
