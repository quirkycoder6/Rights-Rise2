import WordGuesser from "../models/WordGuesser";

export const guesser = async (req, res) => {
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
};
