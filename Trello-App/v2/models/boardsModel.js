import mongoose from "mongoose";
//import { Schema } from "zod";
const boardSchema = mongoose.Schema({
    title:{
        type:string
    },
    organization:{type:Schema.Types.ObjectId,ref:"Organizations"},
    createdBy:{
        type:Schema.Types.ObjectId,ref:"Users"
    },
    members:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }],
}, { timestamps: true })
const boardModel = mongoose.model("Boards",boardSchema);
export default  boardModel;