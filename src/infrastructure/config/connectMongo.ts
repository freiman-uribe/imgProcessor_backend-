import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Conexión exitosa a la BD");
  } catch (error) {
    console.error("🚀 ~ connect ~ error:", error);
    process.exit(1);
  }
};

export default connect;