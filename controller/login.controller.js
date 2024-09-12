const { getUserByEmail } = require('../business/userMovieRating.business');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
require('dotenv').config();

const verifyPassword = (userInputPassword, hashedPassword) => {
    const convertedInputPassword = md5(userInputPassword);
    return convertedInputPassword == hashedPassword;
};

const verifyLoginController = async (req, res) => {
    const { email, password } = req.body;


    const userInfo = await getUserByEmail(email);

    if (!verifyPassword(password, userInfo.password)) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Authentication successfull', token });
    console.log(token)
};

module.exports = { verifyLoginController };

