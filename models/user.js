const mongoose = require("mongoose")

//user model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: Number,
  profilePictureUrl: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: String
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User