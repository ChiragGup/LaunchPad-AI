import mongoose from "mongoose";


const userHistory = new mongoose.Schema({
userId:{
     type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userCollection",
},
loginData:{
type:Date,
default:Date.now
},
logoutData:{
type:Date,
default:null,
}
})

const history = mongoose.model("history", userHistory)
export default history;