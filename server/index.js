const express = require("express")
const app = express();

require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 4000

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());


// app.use((req, res, next) => {
//   console.log("METHOD:", req.method);
//   console.log("URL:", req.url);
//   console.log("HEADERS:", req.headers);
//   let data = '';
//   req.on('data', chunk => { data += chunk });
//   req.on('end', () => {
//     console.log("RAW BODY:", data);
//     next();
//   });
// });

const auth = require("./routes/User")
app.use("/api/v1",auth);

const event = require("./routes/Event")
app.use("/api/v1",event);



const {dbconnect} = require("./config/database")
dbconnect();

app.listen(PORT , ()=>{
   console.log(`server Started successfully at port no. ${PORT}`)
})

app.get("/" , (req,res)=>{
   res.send(`<h1> This is homepage, response from server hance the server is up and running <h1/>`)
})