import NumberGuesser from "../models/NumberGuesser";

export const guesser = async (req, res) => {
  try {
    const { userId, question, correct } = req.body;
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
};
