const mongoose = require("mongoose")
const User = require("./user")

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    city: String,
    country: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: String
    }

  ]
})

const Destination = mongoose.model("Destination", destinationSchema)
module.exports = Destination