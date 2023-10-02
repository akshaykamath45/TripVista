const mongoose = require("mongoose")
const express = require("express")
require("./db")
const User = require("./models/user")
const Destination = require("./models/destination")
const {
    createNewTravelDestination,
    readTravelDestination,
    readAllTravelDestinations,
    readTravelDestinationsByLocation,
    readTravelDestinationsByRating,
    updateTravelDestination,
    deleteTravelDestination,
    filterDestinationsByRating,
    addReview,
    getFirstThreeReviews,
} = require("./controllers/destinationController");
const {
    addUser
} = require("./controllers/userController")

const app = express()
app.use(express.json()) // default middleware

app.get("/", (req, res) => {
    res.send("Trip Vista :)")
})

const PORT = process.env.PORT || 3000
app.listen((PORT), () => {
    console.log(`Serveris listening on port ${PORT}`)
})



