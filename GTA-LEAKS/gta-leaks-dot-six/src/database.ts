import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://7_sav_age_7:123789!@clustermain.q9lrl.mongodb.net/"
    );
  } catch (error) {
    console.error("failed to connect database ", error);
    process.exit(1);
  }
};

export default connectDB;
