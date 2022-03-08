const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'products name must be provided'],
    },
    price:{
        type:Number,
        required:[true,'products price must be provided'],
    },
    featured:{
        type:Boolean,
     default:false
    },
    ratings:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,

        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{values} is not supported'
        }
        //enum:['ikea','liddy','caressa','marcos']
    }
    

})

module.exports=mongoose.model('Product',productSchema);