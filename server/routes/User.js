const express = require("express");
const router = express.Router();

const{
   login,
   signUp,
   sendOtp
} = require("../controllers/Auth");


router.post("/login",login);
router.post("/signup",signUp);
router.post("/sendotp",sendOtp);


module.exports = router;