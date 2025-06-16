const express = require("express")
const app = express();

require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 4000

app.use(cors());

app.use(express.json());


//api mounting left;


const {dbConnect} = require("./config/database")
dbConnect();

app.listen(PORT , ()=>{
   console.log(`server Started successfully at port no. ${PORT}`)
})

app.get("/" , (req,res)=>{
   res.send(`<h1> This is homepage, response from server hance the server is up and running <h1/>`)
})