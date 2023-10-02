const mongoose = require("mongoose")
require("./db")
const User = require("./models/user")
const Destination = require("./models/destination")

const sampleDestination = {
    name: "Sample Destination",
    location: {
        city: "Sample City",
        country: "Sample Country"
    },
    description: "This is a sample travel destination with a brief description.",
    rating: 8
};



//creating new travel destinaton
async function createNewTravelDestination(travelDestination) {
    try {
        const destination = new Destination(travelDestination);
        const saveDestinaton = await destination.save()
        console.log("New destination added successfully ", saveDestinaton)

    } catch (error) {
        console.log("Failed to add new destination ", error)
    }
}
// createNewTravelDestination(sampleDestination)


//read a travel destinaton
async function readTravelDestination(destinationName) {
    try {
        const findDestination = await Destination.findOne({ name: destinationName })
        if (findDestination) {
            console.log("Destination found ", findDestination)
        } else {
            console.log(`Cannot find destination with name ${destinationName}`)
        }
    } catch (error) {
        console.log("Failed to find the travel destination ", error)
    }
}
// readTravelDestination("Kyoto")

//read all travel destinations
async function readAllTravelDestinations() {
    try {
        const destinations = await Destination.find({});
        if (destinations) {
            console.log("All destinations ", destinations)
        } else {
            console.log("Cannot find all destinations")
        }
    } catch (error) {
        console.log("Failed reading all the travel destinations ", error)
    }
}
readAllTravelDestinations();