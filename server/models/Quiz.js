import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
