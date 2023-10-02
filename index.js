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


//placing static routes first over dynamic routes
//reading travel destinations by rating
app.get("/destinations/rating", async (req, res) => {
    try {
        const destinations = await readTravelDestinationsByRating()
        if (destinations) {
            res.json({ message: "Destinations sorted by rating in descending order", destinations: destinations })
        } else {
            res.status(404).json({ error: "No destinations found to be sorted" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to sort destinations by rating" })
    }
})


//reading a travel destination API
app.get("/destinations/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const destination = await readTravelDestination(name);
        if (destination) {
            res.json({ message: "Destination found", destination: destination })
        } else {
            res.status(404).json({ error: "Destination not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to find the destination" })
    }
})


//reading all travel destinations API
app.get("/destinations", async (req, res) => {
    try {
        const destinations = await readAllTravelDestinations()
        if (destinations) {
            res.json({ message: "All destinations fetched successfully", destinations: destinations })
        } else {
            res.status(404).json({ error: "Cannot find all destinations" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve all the destinations" })
    }
})


//reading travel destinations by location
app.get("/destinations/location/:location", async (req, res) => {
    try {
        const { location } = req.params
        const destinations = await readTravelDestinationsByLocation(location)
        if (destinations) {
            res.json({ message: "Destinations found", destinations: destinations })
        } else {
            res.status(404).json({ error: `Cannot find any destination from the location ${location}` })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve the data from location" })
    }
})


//updating a travel destination API
app.post("/destinations/:destinationId", async (req, res) => {
    try {
        const { destinationId } = req.params
        const updateData = req.body
        const destination = await updateTravelDestination(destinationId, updateData)
        if (destination) {
            res.json({ message: "Updated destination successfully", destination: destination })
        } else {
            res.status(404).json({ error: "Cannot find the destination to update" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update travel destinations" })
    }
})