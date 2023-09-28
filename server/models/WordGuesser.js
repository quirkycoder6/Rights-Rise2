import mongoose from "mongoose";

const WordGuesserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

const WordGuesser = mongoose.model("WordGuesser", WordGuesserSchema);
export default WordGuesser;