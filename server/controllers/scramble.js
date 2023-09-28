import Scramble from "../models/Scramble";

export const guesser = async (req, res) => {
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
};
