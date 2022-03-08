require('dotenv').config();

const connectDb=require('./db/connect');
const Product=require('./models/product');

const jsonProducts=require('./products.json');

const start=async()=>{
try{
await  connectDb(process.env.URL)
//this will clear the entire db
await Product.deleteMany();
//here there is no need to do looping for adding the products 
await Product.create(jsonProducts)
//console.log("sucess");
process.exit(0);
}
catch(error)
{
//console.log('error',error);
process.exit(1);
}
}
start();