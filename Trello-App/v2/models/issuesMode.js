import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,

  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Boards"
  },

  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo"
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
}, { timestamps: true });
const issueModel = mongoose.model("Issue",issueSchema);
export default issueModel;