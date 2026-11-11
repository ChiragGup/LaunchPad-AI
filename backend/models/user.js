import mongoose from "mongoose"

const userData = new mongoose.Schema({
    fullName:{
      type: String,
      required: true,
      trim: true,
    },
    email:{
      type: String,
      required: true,
      trim: true,
           unique: true,
      lowercase: true,
    },
    password:{
      
  type: String,
  required: true,
  minlength: 8,

    },
       profileImage: {
      type: String,
      default: "",
    },
    role:{
      type : String,
      enum:["admin","user"],
      default:"user"
    }
  },
    {
      timestamps:true,
    }
)

const userCollection  = mongoose.model("userCollection",userData);
export default userCollection;