import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import NumberGuesser from "./models/Number.js";
import Quiz from "./models/Quiz.js";
import Scramble from "./models/Scramble.js";
import WordGuesser from "./models/WordGuesser.js";
import { verifyToken } from "./middleware/auth.js";

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


app.post('/quiz', async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = new Quiz(questionData);
    await newQuestion.save();
    res.status(200).json({ message: 'Question created successfully' });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question' });
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
