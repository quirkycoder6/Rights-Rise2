import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      }
    }
  );
  
  const Video = mongoose.model("Video", VideoSchema);
  export default Video;