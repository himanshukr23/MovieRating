const { createUser, getUserByEmail } = require('../business/userMovieRating.business');
const { format } = require('date-fns');
const md5 = require('md5');

const createUserController = async (req, res) => {
    const userInfo = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: md5(req.body.password),
        createdat: format(new Date(), 'yy-MM-dd HH:mm'),
    }
    const item = await createUser(userInfo);
    res.status(200).json(item);
};

const getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    const item = await getUserByEmail(email);
    if (!item) {

        res.status(404).json({ message: 'Given name not found!!' });

    } else {

        res.status(200).json(item)
    }
}

module.exports = {
    createUserController,
    getUserByEmailController
}