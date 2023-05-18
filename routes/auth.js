const express = require("express");
const {login} = require("../controllers/authController.js");
const {register} = require("../controllers/authController.js");
const router = express.Router()

// router.get("/",(req,res)=>{
//   res.send("Hello this is auth endpoint")
// })
router.post("/register", register)


router.post("/login", login)
module.exports = router