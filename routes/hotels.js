import express  from "express";
import { countByCity,getHotelRooms ,countByType, deleteHotel, getByIdHotel, getHotel, postHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router()
 
router.post("/",verifyAdmin,postHotel)


router.put("/:id",verifyAdmin,updateHotel)


router.delete("/:id",verifyAdmin,deleteHotel)

// get by particular Id hotel
router.get("/find/:id",getByIdHotel)

router.get("/",getHotel)


// for filter the data
router.get("/countByCity",countByCity)

router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)

export default router 