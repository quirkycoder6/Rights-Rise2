// const app = express();
// import NumberGuesser from "../models/NumberGuesser";
// import Quiz from "../models/Quiz";
// import Scramble from "../models/Scramble";
// import WordGuesser from "../models/WordGuesser";

// app.post('/numberguesser' , async (req, res) => {
//   try {
//     const { userId, question, correct } = req.body;
//     const newGame = new NumberGuesser({
//       userId,
//       question,
//       correct,
//     });
//     await newGame.save();
//     const games = await NumberGuesser.find({ userId });
//     res.status(201).json(games);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// });

// app.post('/quiz', async (req, res) => {
//   try {
//     const { userId, question, options, correct } = req.body;
//     const newGame = new Quiz({
//       userId,
//       question,
//       options,
//       correct,
//     });
//     await newGame.save();
//     const games = await Quiz.find({ userId });
//     res.status(201).json(games);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// })

// app.post( '/scramble' , async (req, res) => {
//   try {
//     const { userId, question, correct } = req.body;
//     const newGame = new Scramble({
//       userId,
//       question,
//       correct,
//     });
//     await newGame.save();
//     const games = await Scramble.find({ userId });
//     res.status(201).json(games);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// })

// app.post( '/wordguesser',async (req, res) => {
//   try {
//     const { userId, question, correct } = req.body;
//     const newGame = new WordGuesser({
//       userId,
//       question,
//       correct,
//     });
//     await newGame.save();
//     const games = await WordGuesser.find({ userId });
//     res.status(201).json(games);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// })


