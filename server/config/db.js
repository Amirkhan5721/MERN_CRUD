const mongoose = require("mongoose");


const dbConnection = async () => {
    mongoose.connect("mongodb://localhost:27017/BookStore")
    .then(() => {
        console.log('Database Connected Successfully!')
    })
    .catch((err) => {
        console.log("Database Connection failed", err)
    });
};

module.exports = dbConnection;