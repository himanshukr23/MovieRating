const express = require('express');
const router = express.Router();
const { createUserController, getUserByEmailController } = require('../controller/userMovieRating.controller');


router.post('/createuser', createUserController);
router.get('/getuserbyemail/:email', getUserByEmailController);

module.exports = router;
