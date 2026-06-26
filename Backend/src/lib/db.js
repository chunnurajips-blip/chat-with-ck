import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("error connection to mongo ", error);
    process.exit(1); // 1 status code fail and 0 succes
  }
};
