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
const barcelonaDestination = {
    name: "Barcelona",
    location: {
        city: "Barcelona",
        country: "Spain"
    },
    description: "Barcelona, the capital of Catalonia, is famous for its unique architecture, vibrant street life, and beautiful beaches along the Mediterranean coast.",
    rating: 9.0
};
const madridDestination = {
    name: "Madrid",
    location: {
        city: "Madrid",
        country: "Spain"
    },
    description: "Madrid, the capital of Spain, is known for its rich history, world-class museums, and lively culture, making it a great destination for art and history enthusiasts.",
    rating: 8.8
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
createNewTravelDestination(barcelonaDestination)
createNewTravelDestination(madridDestination)


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
// readAllTravelDestinations();

//read all travel destinations by location
async function readTravelDestinationsByLocation(destinationLocation) {
    try {
        const destinations = await Destination.find({
            $or: [
                { 'location.city': destinationLocation },
                { 'location.country': destinationLocation }
            ]
        })
        if (destinations.length > 0) {
            console.log(`Destinations with location ${destinationLocation} `, destinations)
        } else {
            console.log(`No destinations found with location ${destinationLocation}`)
        }
    } catch (error) {
        console.log("Failed to retrieve travel destinations ", error)
    }
}
// readTravelDestinationsByLocation("Spain")


//read all travel destinations by rating
async function readTravelDestinationsByRating() {
    try {
        const destinations = await Destination.find({}).sort({ rating: -1 })
        if (destinations.length > 0) {
            console.log("Destinations sorted in descending order by rating ", destinations)
        } else {
            console.log("No destinations found to be sorted")
        }
    } catch (error) {
        console.log("Failed to retrieve destination based on ratings ", error)
    }
}
// readTravelDestinationsByRating()


//updating travel destination by ID
async function updateTravelDestination(destinationId, updatedDestinationData) {
    try {
        const destination = await Destination.findOne({ _id: destinationId })
        if (destination) {
            destination.set(updatedDestinationData)
            const updatedDestination = await destination.save()
            console.log(`Updated destination ${destination.name} `, updatedDestination)
        } else {
            console.log("Cannot find the destination to update")
        }

    } catch (error) {
        console.log('Failed to update the travel destination ', error)
    }
}
updateTravelDestination("651a5da9bdcadafee8753dee", { rating: 9.8 })