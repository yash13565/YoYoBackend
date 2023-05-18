const express = require("express");
const {countByCity,postHotel, updateHotel, deleteHotel, getByIdHotel, getHotel, countByType, getHotelRooms} = require("../controllers/hotelController.js");

const {verifyAdmin }= require("../utils/verifyToken.js");

const router = express.Router()

router.post("/", verifyAdmin, postHotel)


router.put("/:id", verifyAdmin, updateHotel)


router.delete("/:id", verifyAdmin, deleteHotel)

// get by particular Id hotel
router.get("/find/:id", getByIdHotel)

router.get("/", getHotel)


// for filter the data
router.get("/countByCity", countByCity)

router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

module.exports = router 