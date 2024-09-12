const express = require('express');
const router = express.Router();
const { createControllerMovieRating, getAllControllerMovieRating, getByIdControllerMovierating, getByNameControllerMovieRating, updateControllerMovieRating, deleteControllerMovieRating, exportAllDataMovieRatingController, importMovieRatingController } = require('../controller/movieRating.controller');

const multer = require('multer');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/create', createControllerMovieRating);
router.get('/getallmovie', getAllControllerMovieRating);
router.get('/getmoviebyid/:id', getByIdControllerMovierating);
router.get('/getbyname/:name', getByNameControllerMovieRating)

router.patch('/updatealldata/:id', updateControllerMovieRating);
router.delete('/deletedatabyid/:id', deleteControllerMovieRating);
router.get('/export', exportAllDataMovieRatingController);
router.post('/import', upload.single('excelData'), importMovieRatingController)

module.exports = router;