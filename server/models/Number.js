import mongoose from "mongoose";

const NumberSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correct: {
    type: Number,
    required: true,
  },
});

const NumberGuesser = mongoose.model("NumberGuesser", NumberSchema);
export default NumberGuesser;