import express  from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { deleteRoom, getByIdRoom,updateRoomAvailability, getRoom, postRoom, updateRoom } from "../controllers/roomController.js";
const router=express.Router()
 
 
router.post("/:hotelid",verifyAdmin,postRoom)


router.put("/:id",verifyAdmin,updateRoom)
router.put("availability/:id",updateRoomAvailability)


router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

// get by particular Id hotel
router.get("/:id",getByIdRoom)

router.get("/",getRoom)

export default router