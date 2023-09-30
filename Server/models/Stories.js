const mongoose = require('mongoose');


const storySchema = new mongoose.Schema(
  {
    Prompt:{
      type: String,
      required: true,
    },
    Story:{
      type: String,
      required: true,
    },
    UpVote: {
      type:Number,
      default:0,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
