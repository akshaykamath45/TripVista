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
const parisDestination = {
    name: "Paris, France",
    location: {
        city: "Paris",
        country: "France"
    },
    description: "Paris, often called the 'City of Light,' is known for its romantic ambiance, world-class art, and iconic landmarks such as the Eiffel Tower.",
    rating: 9.5
};
const newYorkCityDestination = {
    name: "New York City, USA",
    location: {
        city: "New York City",
        country: "United States"
    },
    description: "New York City, the 'Big Apple,' is a bustling metropolis known for its diverse culture, Broadway shows, and famous landmarks like Times Square and Central Park.",
    rating: 9.2
};
const tokyoDestination = {
    name: "Tokyo, Japan",
    location: {
        city: "Tokyo",
        country: "Japan"
    },
    description: "Tokyo, the capital of Japan, is a modern city known for its technology, vibrant street life, and historical sites like the Imperial Palace and Meiji Shrine.",
    rating: 8.9
};
const romeDestination = {
    name: "Rome, Italy",
    location: {
        city: "Rome",
        country: "Italy"
    },
    description: "Rome, the 'Eternal City,' is a historical treasure trove known for its ancient ruins, including the Colosseum and Roman Forum, as well as delicious Italian cuisine.",
    rating: 9.0
};
const baliDestination = {
    name: "Bali, Indonesia",
    location: {
        city: "Denpasar",
        country: "Indonesia"
    },
    description: "Bali, known as the 'Island of the Gods,' offers stunning beaches, lush landscapes, and a rich cultural heritage, making it a popular destination for relaxation and adventure.",
    rating: 9.3
};
const capeTownDestination = {
    name: "Cape Town, South Africa",
    location: {
        city: "Cape Town",
        country: "South Africa"
    },
    description: "Cape Town is a beautiful coastal city known for its stunning beaches, diverse wildlife, and iconic landmarks like Table Mountain and the Cape of Good Hope.",
    rating: 9.1
};
const kyotoDestination = {
    name: "Kyoto, Japan",
    location: {
        city: "Kyoto",
        country: "Japan"
    },
    description: "Kyoto, a historic city in Japan, is famous for its traditional temples, beautiful gardens, and cultural heritage, offering a glimpse into Japan's ancient past.",
    rating: 9.4
};

const santoriniDestination = {
    name: "Santorini, Greece",
    location: {
        city: "Santorini",
        country: "Greece"
    },
    description: "Santorini is a picturesque island in the Aegean Sea known for its stunning sunsets, white-washed buildings, and crystal-clear waters, making it a romantic getaway.",
    rating: 9.6
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
createNewTravelDestination(parisDestination)
createNewTravelDestination(newYorkCityDestination)
createNewTravelDestination(tokyoDestination)
createNewTravelDestination(romeDestination)
createNewTravelDestination(baliDestination)
createNewTravelDestination(capeTownDestination)
createNewTravelDestination(kyotoDestination)
createNewTravelDestination(santoriniDestination)

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
// readTravelDestination("Sample Destination")