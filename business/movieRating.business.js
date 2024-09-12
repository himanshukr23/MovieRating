// const { areIntervalsOverlappingWithOptions } = require('date-fns/fp/areIntervalsOverlappingWithOptions');
const item = require('../module/movie.schema');

//!Create
const createMovieRating = async (MovieData) => {
    try {
        const newMovieRating = new item(MovieData);
        await newMovieRating.save();
        return newMovieRating;
    } catch (error) {
        throw error;
    }
}

//!GetAll
const getAllMovieRating = async () => {
    try {
        const allMovieRating = await item.find();
        return allMovieRating;
    } catch (error) {
        throw error
    }
}

//!GetById
const getByIdMovieRating = async (id) => {
    try {
        const byIdMovieRating = await item.findById(id);
        return byIdMovieRating
    } catch (error) {
        throw error;
    }
}


// !getByName
const getByNameMovieRating = async (name) => {
    try {
        const MovieRatingByName = await item.findOne({ moviename: name });
        return MovieRatingByName;
    } catch (err) {
        throw err;
    }
}

// !UpdateById
const updateMovieRating = async (id, toUpdateMovieData) => {
    try {
        const updateItem = await item.findByIdAndUpdate(id, toUpdateMovieData, { new: true });
        return updateItem;
    } catch (error) {
        throw error;
    }
}

// !DeleteById
const deleteMovieRating = async (id) => {
    try {
        const deleteData = await item.findByIdAndDelete(id);
        return deleteData
    } catch (error) {
        throw error;
    }
}

// !ExportDataToExcel
const exportAllDataMovieRating = async () => {
    try {
        const data = await item.find({}).lean();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error)
        throw error;
    }
}

module.exports = {
    createMovieRating,
    getAllMovieRating,
    getByIdMovieRating,
    getByNameMovieRating,
    updateMovieRating,
    deleteMovieRating,
    exportAllDataMovieRating,
}