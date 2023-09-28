import Quiz from "../models/Quiz";

export const guesser = async (req, res) => {
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
};
