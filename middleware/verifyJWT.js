console.log('1')

const jwt = require('jsonwebtoken');
require('dotenv').config();
console.log('2')

function validateJWT(req, res, next) {
    const token = req.header('Authorization').replace('Bearer', '').trim();

    console.log('3')
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
        console.log(7)
    }
    console.log('4')

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
            console.log(8)
        }

        console.log('5')
        req.user = decoded;
        next();

    })
}
console.log('6')

module.exports = {
    validateJWT,
}