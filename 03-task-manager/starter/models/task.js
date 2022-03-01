const mongoose=require('mongoose');


const TaskScheam=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name canot be more than 20 characters']
    },completed:{
        type:Boolean,
        default:false
    } 
})

module.exports=mongoose.model('Task',TaskScheam)

