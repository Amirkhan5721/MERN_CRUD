const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const bookRouter = require('./routes/bookRoutes');
require('dotenv').config();

// database connection
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("crud app");
})

app.use('/book', bookRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});