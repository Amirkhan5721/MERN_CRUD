const { request } = require('express');
const { Book } = require('../models/bookModel');


const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body

        if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        };

        const bookAdd = await Book.insertOne(body);

        if (bookAdd) {
            return res.status(201).json({
                message: "Data Created Successfully.",
                success: true,
                id: bookAdd?._id,
            });
        };

        console.log('BookAdded', bookAdd)
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

const handleBookListController = async (req, res) => {
    try {
        const bookList = await Book.find({});
        return res.status(200).json({
            message: "All books fetch Successfully.",
            success: true,
            TotalCount: bookList.length,
            bookList: bookList,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}
const handleBookDeleteController = async (req, res) => {
    const body = req.body
    try {
        const deleted = await Book.deleteOne({ _id: body.id });
        if (deleted.acknowledged) {
            res.status(200).json({
                message: "Book deleted Successfully!",
                success: true,
            });
        };
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

const handleBookUpdateController = async (req, res) => {
    try {
        const body = req.body
        const updateing = await Book.updateOne({ _id: body?.id }, {$set: body});
        console.log(updateing)

        if(updateing?.acknowledged) {
            return res.status(200).json({
                message: "Book updated successfully.",
                success: true,
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        })
    }
}
module.exports = {
    handleBookStoreController,
    handleBookListController,
    handleBookDeleteController,
    handleBookUpdateController,
};