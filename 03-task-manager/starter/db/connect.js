const mongoose=require('mongoose');
// const connectionString='mongodb+srv://yadnyesh:RABw576NhuSPqrlE@cluster0.nfeji.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';

const connectDb=(url)=>{
  return  mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    
    })
}
module.exports=connectDb;
