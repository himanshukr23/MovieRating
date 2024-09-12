const { createMovieRating, getAllMovieRating, getByIdMovieRating, getByNameMovieRating, updateMovieRating, deleteMovieRating, exportAllDataMovieRating } = require('../business/movieRating.business');
const { format } = require('date-fns');
const XLSX = require('xlsx');

//! create
const createControllerMovieRating = async (req, res) => {
    const newItem = {
        moviename: req.body.moviename,
        releasedata: req.body.releasedata,
        review: req.body.review,
        directoryname: req.body.directoryname,
        productionhouse: req.body.productionhouse,
        earning: req.body.earning,
        budget: req.body.budget,
        movieid: req.body.movieid,
        createdat: format(new Date(), 'yy-MM-dd HH:mm')
    };

    const item = await createMovieRating(newItem);
    res.status(200).json(item);
}

// !getAll
const getAllControllerMovieRating = async (req, res) => {
    const item = await getAllMovieRating();
    res.status(200).json(item)
}

// !getById
const getByIdControllerMovierating = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await getByIdMovieRating(id);
        if (!item) {
            res.status(404).json({ message: "Given id not found" });
        } else {
            res.status(200).json(item);
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

// !getByName

const getByNameControllerMovieRating = async (req, res) => {
    const { name } = req.params; const item = await getByNameMovieRating(name);
    if (!item) {
        res.status(400).json({ message: "given Name not found" })
    } else {
        res.status(200).json(item)
    }
}

// !Update
// const updateControllerMovieRating = async (req, res) => {
//     const { id } = req.params;
//     let movieRatigData = await getItemById(id);
//     movieRatigData.item = req.body.item;
//     const 
// }

// const updateControllerMovieRating = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let movieRatingData = await getItemById(id);

//         if (!movieRatingData) {
//             return res.status(404).json({ message: "Movie rating not found" });
//         }

//         // to update particular field; 
//         // movieRatingData.earning = req.body.earning; 

//         //  Iterate over the keys in the request body and update the corresponding fields 
//         Object.keys(req.body).forEach(key => {
//             movieRatingData[key] = req.body[key];
//         });

//         const updatedItem = updateMovieRating(id, movieRatingData);
//         res.status(200).json(updatedItem);
//     } catch (error) {
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }

// }

const updateControllerMovieRating = async (req, res) => {
    try {
        const { id } = req.params;
        let movieRatingData = await getByIdMovieRating(id);

        if (!movieRatingData) {
            return res.status(404).json({ message: "Movie rating not found" });
        }

        // Iterate over the keys in the request body and update the corresponding fields
        Object.keys(req.body).forEach(key => {
            movieRatingData[key] = req.body[key];
        });

        // Make sure to await the update operation
        const updatedItem = await updateMovieRating(id, movieRatingData);

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// !Delete

const deleteControllerMovieRating = async (req, res) => {
    const { id } = req.params;
    const deleteData = await deleteMovieRating(id);
    try {
        if (!deleteData) {
            res.status(404).json({ message: "Given data does not exists" });
        } else {
            res.status(200).json({ message: "Data deleted successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occured", error: error.message })
    }
}

// !ExportAllDataToExcel
const exportAllDataMovieRatingController = async (req, res) => {
    try {
        const MovingRatingItem = await ExportMovingRating();
        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(MovingRatingItem);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'item');

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename= output.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet');

        res.send(buffer);

        console.log('excel file sent as a response');
    } catch (err) {
        res.send(err);
    }
}

// !ImportAllData

const importMovieRatingController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({ message: "No file uploaded" });
        }

        const workbook = XLSX.read(req.file.buffer);
        const sheetNames = workbook.sheetNames;

        const excelData = [];
        sheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            excelData.push(...jsonData);
        });
        res.json({ message: "Excel file uploaded", data: excelData });
    } catch (error) {
        console.error('Error in parsing Excel file', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createControllerMovieRating,
    getAllControllerMovieRating,
    getByIdControllerMovierating,
    getByNameControllerMovieRating,
    updateControllerMovieRating,
    deleteControllerMovieRating,
    exportAllDataMovieRatingController,
    importMovieRatingController,
}
