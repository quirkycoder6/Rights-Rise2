import mongoose from "mongoose";

const quizQuestion = new mongoose.Schema({
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  correctOption: String,
});

const Quiz = mongoose.model("quizQuestion", quizQuestion);
export default Quiz;
