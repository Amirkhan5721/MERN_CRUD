const express = require("express");
const { handleBookStoreController,
     handleBookListController,
     handleBookDeleteController,
     handleBookUpdateController,
     } = require('../controller/bookController')


const router = express.Router();

router.post('/addbook', handleBookStoreController);
router.get('/booklists', handleBookListController);
router.post('/deletebook', handleBookDeleteController);
router.put('/updatebook', handleBookUpdateController);

module.exports = router;