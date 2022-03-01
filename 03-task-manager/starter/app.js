
const express=require('express');
const connectDb = require('./db/connect');
const app=express();
const task=require('./routes/task');
const notFound=require('./middleware/notfound');
const errorHandler = require('./middleware/error');

require('dotenv').config();
const port=3000;


//middleare
app.use(express.static('./public'))
app.use(express.json())
//routes
// app.get('/hello',(req,res)=>{
//     res.send('Tak Manager')
// })

app.use('/api/v1/task',task)
app.use(notFound);
app.use(errorHandler);

//if the db is connected then only go to server
const start=async()=>{
    try{
await connectDb(process.env.MONGO_URI)
app.listen(port,()=>{
    console.log('server is listening')
})

    }
    catch(error)
    {
console.log(error)
    }
}
start()
