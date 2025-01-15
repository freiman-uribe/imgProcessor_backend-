import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./config/connectMongo";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/imageRoutes";

const app = express();
const server = http.createServer(app);

require("dotenv").config();


connectDB();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
