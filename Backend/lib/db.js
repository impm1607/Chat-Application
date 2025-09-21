import mongoose from "mongoose";

console.log(process.env.MONGODB_URI);
const URI = process.env.MONGODB_URI + "/Chat-App";
// Function to connect to MongoDB database
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database connected")
    );

    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
  }
};
