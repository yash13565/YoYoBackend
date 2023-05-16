import user from "../models/user.js";



export const updateUser=async(req,res,next)=>{
    try {
        const updatedUser=await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)   
       } catch (error) {
           next(error)
       }
}

export const deleteUser=async(req,res,next)=>{
    try {
        await user.findByIdAndDelete(
            req.params.id
        )
     res.status(200).json("user has been deleted.")   
    } catch (error) {
        next(error)
    }
}

export const getByIdUser=async(req,res,next)=>{
    try {
        const foundUser=await user.findById(req.params.id)
      res.status(200).json(foundUser)   
     } catch (error) {
         next(error)
     }
}

export const getUser=async(req,res,next)=>{
    try {
        const users= await user.find()
      res.status(200).json(users)   
     } catch (error) {
         next(error)
     }
}