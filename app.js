import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRouter from './routes/userRoutes.js'

const app = express();
// const DB_URL= process.env.DB_URL;

app.use(cors())

// db connection
connectDB();  

//JSON
app.use(express.json())

// routes
app.use("/auth",userRouter);

const port = process.env.PORT;
app.listen(3000 ,()=>{
    console.log(`server is running...`)
}) 