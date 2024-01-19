import { User } from "../models/user";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "work_manager",
    });
    //testing and creating new user
    // const uuser = new User({
    //   name: "test name",
    //   email: "test@gmail.com",
    //   password: "testpassword",
    // });
    // await uuser.save();
    // console.log("user is created")
    console.log("db_connected");
    // console.log(connection)
    // console.log("connection with the host", connection.host)
  } catch (error) {
    console.log("failed to connect with db");
    console.log(error);
  }
};
