import mongoose from "mongoose";

const ScrambleSchema = new mongoose.Schema({
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

const Scramble = mongoose.model("Scramble", ScrambleSchema);
export default Scramble;