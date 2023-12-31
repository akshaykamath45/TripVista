const Destination = require("../models/destination")

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
        const saveDestination = await destination.save()
        console.log("New destination added successfully ", saveDestination)
        return saveDestination
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
            return findDestination
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
            return destinations;
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
            return destinations
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
            return destinations
        } else {
            console.log("No destinations found to be sorted")
        }
    } catch (error) {
        console.log("Failed to retrieve destination based on ratings ", error)
    }
}
// readTravelDestinationsByRating()


//update a travel destination by ID
async function updateTravelDestination(destinationId, updatedDestinationData) {
    try {
        const destination = await Destination.findOne({ _id: destinationId })
        if (destination) {
            destination.set(updatedDestinationData)
            const updatedDestination = await destination.save()
            console.log(`Updated destination ${destination.name} `, updatedDestination)
            return updatedDestination
        } else {
            console.log("Cannot find the destination to update")
        }

    } catch (error) {
        console.log('Failed to update the travel destination ', error)
    }
}
// updateTravelDestination("651a5da9bdcadafee8753dee",{rating:9.8})


//delete a travel destination by ID
async function deleteTravelDestination(destinationId) {
    try {
        const destination = await Destination.findOne({ _id: destinationId })
        const deleteDestination = await Destination.findOneAndDelete({ _id: destinationId })

        if (deleteDestination) {
            console.log(`Deleted destination with ID ${destinationId} `, destination)
            return deleteDestination
        } else {
            console.log("Cannot find the destination to delete")
        }
    } catch (error) {
        console.log("Failed to delete the destination", error)
    }
}
// deleteTravelDestination("651a5da8bdcadafee8753ded")


//filter destinations by minimum rating
async function filterDestinationsByRating(minimumRating) {
    try {

        const destinations = await Destination.find({})
        const filterDestinations = destinations.filter((destination) => destination.rating >= minimumRating)
        if (filterDestinations.length > 0) {
            console.log(`Destinations with minimum rating of ${minimumRating}`, filterDestinations)
            return filterDestinations
        } else {
            console.log(`Cannot find destinations with minimum rating of ${minimumRating}`)
        }
    } catch (error) {
        console.log("Failed to filter destinations by ratings ", error)
    }
}
// filterDestinationsByRating(10);


// add review to travel destination
async function addReview(userId, destinationId, reviewText) {
    try {
        const destination = await Destination.findById(destinationId)
        if (destination) {
            const review = {
                user: userId,
                text: reviewText
            }
            destination.reviews.push(review)
            await destination.save()
            const populateDestination = await Destination.findById(destinationId).populate('reviews.user', 'profilePictureUrl');
            console.log("Updated reviews for the destination ", populateDestination)
            return populateDestination
        } else {
            console.log("Cannot find the destination")
        }
    } catch (error) {
        console.log("Failed to add review ", error)
    }
}
// addReview("651a78ffa62e3d86b354a094","651a5da9bdcadafee8753dee","One of the best place in france")


// querying reviews of travel destination
//(retrieve the first 3 reviews of a travel destination, populated with user details)
async function getFirstThreeReviews(destinationId) {
    try {
        const populatedDestination = await Destination.findById(destinationId).populate({
            path: 'reviews.user',
            select: 'username email profilePicutureUrl',
            options: { limit: 3 }
        })
        if (populatedDestination) {
            const firstThreeReviews = populatedDestination.reviews.slice(0, 3)
            console.log(`First 3 reviews of the destination ${populatedDestination.name} `, firstThreeReviews)
            return firstThreeReviews
        } else {
            console.log("Cannot find the destination")
        }
    } catch (error) {
        console.log('Failed to retrieve the reviews')
    }
}
// getFirstThreeReviews("651a5da9bdcadafee8753dee")


module.exports = {
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
};


// userId - > 651a78ffa62e3d86b354a094

// async function deleteAllDestinations(){
//   try{
//     const deleteDestinations=await Destination.deleteMany({});
//     console.log("Deleted  all destinations")
//   }catch(error){
//     console.log("Failed to delete all destinations ",error)
//   }
// }
// deleteAllDestinations()