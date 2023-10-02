const User = require("../models/user")
async function addUser(newUser) {
    try {
        const user = new User(newUser);
        const userCreated = await user.save();
        if (userCreated) {
            console.log("New user created successfully ", userCreated);
        } else {
            console.log("New user not created,check again");
        }
    } catch (error) {
        console.log("Failed to add user ", error)
    }
}
module.exports = {
    addUser
}