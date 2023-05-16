import room from "../models/room.js";
import hotel from "../models/hotel.js";


export const postRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelid
    const newRoom= new room(req.body)

    try {
        const savedRoom=await newRoom.save()
        try {
            await hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id}
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom=async(req,res,next)=>{
    try {
        const updatedRoom=await room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom)   
       } catch (error) {
           next(error)
       }
}
export const updateRoomAvailability=async(req,res,next)=>{
    try {
        await room.updateOne({'roomNumber._id':req.params.id},{
            $push:{
                "roomNumber.$.unavailableDates":req.body.dates
            }
        })
        res.status(200).json(updateRoomAvailability)   
       } catch (error) {
           next(error)
       }
}

export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid
    try {
        await room.findByIdAndDelete(
            req.params.id
        )
        try {
            await hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            })
        } catch (error) {
            next(error)
        }
     res.status(200).json("room has been deleted.")   
    } catch (error) {
        next(error)
    }
}

export const getByIdRoom=async(req,res,next)=>{
    try {
        const foundRoom=await room.findById(req.params.id)
      res.status(200).json(foundRoom)   
     } catch (error) {
         next(error)
     }
}

export const getRoom=async(req,res,next)=>{
    try {
        const rooms= await room.find()
      res.status(200).json(rooms)   
     } catch (error) {
         next(error)
     }
}