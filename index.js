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
    console.log(`Server is listening on port ${PORT}`)
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


//deleting a travel destination API
app.delete("/destinations/:destinationId", async (req, res) => {
    try {
        const { destinationId } = req.params
        const destination = await deleteTravelDestination(destinationId)
        if (destination) {
            res.json({ message: "Deleted destination successfully", destination: destination })
        } else {
            res.status(404).json({ error: "Cannot find the destination to delete" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the destination" })
    }
})


//filtering destinations by minimum rating
app.get("/destinations/filter/:minRating", async (req, res) => {
    try {
        const { minRating } = req.params
        const destinations = await filterDestinationsByRating(minRating)
        if (destinations) {
            res.json({ message: `Found ${destinations.length}  destinations with minimum rating of ${minRating}`, destinations: destinations })
        } else {
            res.status(404).json({ error: `Cannot find destinations with minimum rating of ${minRating}` })
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve destinations with minimum rating of ${minimumRating}` })
    }
})


//adding review to a travel destination
app.post("/destinations/:destinationId/reviews", async (req, res) => {
    try {
        const { destinationId } = req.params
        const userId = req.body.userId
        const reviewText = req.body.reviewText
        const destinationReview = await addReview(userId, destinationId, reviewText)
        if (destinationReview) {
            res.json({ message: "Added review successfully", destination: destinationReview })
        } else {
            res.status(404).json({ error: "Cannot find the destination to add review" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to add review for the destination" })
    }
})


//retrieving reviews of a travel destination
app.get("/destinations/:destinationId/reviews", async (req, res) => {
    try {
        const { destinationId } = req.params
        const destination = await Destination.findById(destinationId)
        const destinationReviews = await getFirstThreeReviews(destinationId)
        if (destinationReviews) {
            res.json({ message: `First 3 Reviews for the destination ${destination.name}`, reviews: destinationReviews })
        } else {
            res.status(404).json({ error: "Cannot find the destination" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retreive reviews for the destination" })
    }
})