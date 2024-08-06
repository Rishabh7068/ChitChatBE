import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import msgRoutes from "./routes/msg.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMonhoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";


config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  connectToMonhoDB();
  console.log(`Server Running on port ${PORT}`);
});
