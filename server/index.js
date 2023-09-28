import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/games.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
 
const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} cannot connect`));