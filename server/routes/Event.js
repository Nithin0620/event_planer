const express = require("express");
const router = express.Router();

const {
   createEvent,
   getallEvent,
   getEventById,
   updateEvent,
   deleteEvent
} = require("../controllers/Event");
const { verifyToken } = require("../middleware/VerifyToken");


router.post("/createevent",verifyToken,createEvent);

router.get("/getallevent",getallEvent);

router.get("/geteventbyid/:id",verifyToken,getEventById);

router.put("/updateevent/:id",verifyToken , updateEvent);

router.delete("/deleteevent",verifyToken , deleteEvent);


module.exports = router ;