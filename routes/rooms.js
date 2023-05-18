const express = require("express");
const {verifyAdmin} = require("../utils/verifyToken.js");
const {deleteRoom,getByIdRoom,updateRoomAvailability,getRoom,postRoom,updateRoom} = require("../controllers/roomController.js");
const router = express.Router()


router.post("/:hotelid", verifyAdmin, postRoom)


router.put("/:id", verifyAdmin, updateRoom)
router.put("availability/:id", updateRoomAvailability)


router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// get by particular Id hotel
router.get("/:id", getByIdRoom)

router.get("/", getRoom)

module.exports = router