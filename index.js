import express from "express";
import { config } from "dotenv";
import authRoutes from './routes/auth.routes.js'
import connectToMonhoDB from "./db/connectToMongoDB.js";
config();
const app = express();
const PORT = process.env.PORT ;


app.use(express.json());
app.use("/api/auth" , authRoutes);

app.get("/" , (req ,res) => {
    res.send("Hello")
});




app.listen(PORT , () => {
    connectToMonhoDB();
    console.log(`Server Running on port ${PORT}`)
});


