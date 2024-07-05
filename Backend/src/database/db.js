import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`).then(() => {
      console.log(`Mongo db is connected successfully!!!!! ${DB_NAME}`);
    });
  } catch (err) {
    console.log("connection failed with database", err);
  }
};

export default connectDB;
