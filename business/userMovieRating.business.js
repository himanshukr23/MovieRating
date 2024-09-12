const user = require('../module/userMovieRating.schema');

// !create
const createUser = async (userData) => {
    try {
        const newUser = new user(userData);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}


//!GetUserByEmail
const getUserByEmail = async (email) => {
    try {
        const findUserByEmail = await user.findOne({ email: email });
        return findUserByEmail
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
}