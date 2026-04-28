import mongoose from "mongoose"
const organizationsSchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    admin:{type: Schema.Types.ObjectId, ref: 'Users'},
    members:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }]
}, { timestamps: true })
const organizationModel= mongoose.model("Organizations",organizationsSchema);
export default organizationModel;