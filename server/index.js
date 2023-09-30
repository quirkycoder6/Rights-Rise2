import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import NumberGuesser from "./models/Number.js";
import Quiz from "./models/Quiz.js";
import Scramble from "./models/Scramble.js";
// import bodyParser from "body-parser";
import WordGuesser from "./models/WordGuesser.js";
// import User from "./models/User.js";
import User from "./models/User.js";
import fs from "fs";
import Video from "./models/Videos.js";

import { verifyToken } from "./middleware/auth.js";
const { ObjectId } = mongoose.Types;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.json({ limit: "3000mb", extended: true }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

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


app.post('/quiz', async (req, res) => {
  try {
    const questionData = req.body;
    const {userId} = req.body;
    const newQuestion = new Quiz(questionData);
    await newQuestion.save();
    const games = await Quiz.find({ userId });
    res.status(200).json({ games });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question' });
  }
});

app.post('/fetchquiz', async (req, res) => {
  try {
    const {userId} = req.body;
    const games = await Quiz.find({ userId });
    res.status(200).json({ games });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question' });
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


// Video Upload and Fetch

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('video'), async(req, res) => {
  const  userId  = req.body.userId;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
    const newVideo = await Video.create({
    userId: userId,
    name: req.file.originalname
  });
  const videos = await Video.find({ userId });
  
  return res.status(200).json({ message: 'File uploaded successfully' });
});


// // fetching videos

const uploadFolder = path.join(__dirname,'/uploads'); 


app.get('/api/videos', (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Filter for video files (e.g., .mp4, .webm)
    const videoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.mp4', '.webm'].includes(ext);
    });

    // Send the list of video files to the client
    res.json({ videos: videoFiles });
  });
});

app.get('/api/videos/:filename', (req, res) => {
    const filename = req.params.filename;
    const videoPath = path.join(uploadFolder, filename);
  
    // Check if the file exists
    if (fs.existsSync(videoPath)) {
      // Stream the video to the client
      const fileStream = fs.createReadStream(videoPath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ error: 'Video not found' });
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
