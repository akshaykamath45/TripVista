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


//creating a travel destination API
app.post("/destinations", async (req, res) => {
    try {
        const destination = await createNewTravelDestination(req.body);
        if (destination) {
            res.json({ message: "Destination added succesfully", destination: destination })
        } else {
            res.status(401).json({ error: "Cannot add the destination" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to add the destination" })
    }
})

