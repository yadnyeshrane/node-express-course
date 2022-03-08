require('dotenv').config();
require('express-async-errors')
// console.log('04 Store API')
//async errors

const express=require('express');
const app=express();
//eeror middleware  import
const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');


//epres middleware

app.use(express.json());

//routes

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to store apis </h1> <a href="/api/v1/products">Product Route</a>')
})

app.use('/api/v1/products',productRouter)
//product ROutws

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port=process.env.PORT || 5000
const start=async()=>{
    try{
        //connect to db here
     await  connectDB(process.env.URL)
        app.listen(port,()=>{
            console.log("server  is listeneing...")
        })
    }
    catch(error)
    {
console.log('error', error)
    }

}

start();
// URL="mongodb+srv://yadnyesh:RABw576NhuSPqrlE@cluster0.nfeji.mongodb.net/03-TASK-MANAGER"
