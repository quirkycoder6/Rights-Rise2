import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import NumberGuesser from "./models/Number.js";
import Quiz from "./models/Quiz.js";
import Scramble from "./models/Scramble.js";
import WordGuesser from "./models/WordGuesser.js";
import User from "./models/User.js";
import { verifyToken } from "./middleware/auth.js";
const { ObjectId } = mongoose.Types;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//LOGIN && REGISTER
app.use("/auth", authRoutes);

//GAMES ROUTES
app.post("/numberguesser", async (req, res) => {
  try {
    const { userId, question, correct } = req.body;
    if (!userId || !question || !correct) {
      return res.status(400).json({ error: "Not enough details" });
    }
    console.log(userId);
    console.log(question);
    console.log(correct);
    const newGame = new NumberGuesser({
      userId,
      question,
      correct,
    });
    await newGame.save();
    const games = await NumberGuesser.find({ userId });
    res.status(201).json(games);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.post("/quiz", async (req, res) => {
  try {
    const { userId, question, options, correct } = req.body;
    const newGame = new Quiz({
      userId,
      question,
      options,
      correct,
    });
    await newGame.save();
    const games = await Quiz.find({ userId });
    res.status(201).json(games);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.post("/scramble", async (req, res) => {
  try {
    const { userId, question, correct } = req.body;
    const newGame = new Scramble({
      userId,
      question,
      correct,
    });
    await newGame.save();
    const games = await Scramble.find({ userId });
    res.status(201).json(games);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.post("/wordguesser", async (req, res) => {
  try {
    const { userId, question, correct } = req.body;
    const newGame = new WordGuesser({
      userId,
      question,
      correct,
    });
    await newGame.save();
    const games = await WordGuesser.find({ userId });
    res.status(201).json(games);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

/* --------------------------------- SCORING -------------------------------- */

app.post("/score", async (req, res) => {
  try {
    const { userId, score } = req.body;
    const userIdObject = new ObjectId(userId);
    const user = await User.findOne({ _id: userIdObject });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.score += score;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser.score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
