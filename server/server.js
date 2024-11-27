const express = require("express")
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')

const cors = require('cors')
const todoRouter = require('./routes/todoRoutes')
const connectToDB = require('./config/db')
connectToDB();

app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/',todoRouter)

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})
