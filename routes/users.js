const express  = require("express");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const { updateUser, deleteUser, getByIdUser, getUser } = require("../controllers/userController");

const router=express.Router()
 
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello ,you are logged in")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello ,you are logged in and delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin,you are logged in and delete all account")
// })

// update the user info
router.put("/:id",verifyUser,updateUser)

//delte the user with it's id
router.delete("/:id",verifyUser,deleteUser)

// get by particular Id user
router.get("/:id",verifyUser,getByIdUser)

//get all users by admin
router.get("/",verifyAdmin,getUser)

module.exports = router