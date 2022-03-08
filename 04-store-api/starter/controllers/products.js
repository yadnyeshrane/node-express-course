const Product=require('../models/product');
const getAllProductsStatic=async(req,res,next)=>{
    //throw new Error('testing the errors');
    //regex
    const search="ikea"
// const productsFetched=await Product.find({name:{$regex:search, $options:'i'}});//for regex only refrence specified
// const productsFetched=await Product.find({}).sort('-name price');
// const productsFetched=await Product.find({}).select('name price').limit(4);//limit and pagination

const productsFetched=await Product.find({price:{$gt:30}}).sort('price').select('name price')//fethc all the products whose price is greater than 30
//on slecte whatehver paramters we specified it will show that only field in response

//for sorting we need to specify the paramter on whihx we need to sort and -name means its will sort in des order 
//if we need to aplly osrt on other paramter  then we need to  specify with space
console.log('productFetched',productsFetched)
    res.status(200).json({msg :productsFetched,nHits:productsFetched.length})
}

const getAllProducts=async(req,res,next)=>{
    // console.log(req.query)
    //get the data in query params
    //if the user send may query para ad some doesnot exit it throw the empty array so in thas case we can only use what is neede
    const {featured,company,name,sort,field,numericFilters}=req.query;
    console.log('featured',featured);
    const queryObject={};
    if(featured)
    {
        queryObject.featured=featured==="true"?true:false 
    }
    if(company)
    {
        queryObject.company=company
    }
    if(name)
    {
        //basivally what every is paaded either a letter or workd it will chekc whetehr it has or not like the smart search
        queryObject.name={$regex:name,$options:'i'}
    }
    
    if(numericFilters)
    {
        const operatorMap={
            ">":"$gt",
            '>=':'$gte'
        }

        const regex=/\b(>|>=)\b/g
        let filters=numericFilters.replace(regex,(match)=>`-${operatorMap[match]}-`)
      //  console.log('Filters',filters)
        const options=['price','ratings'];
        filters=filters.split(',').forEach((item)=>{
            const[field,operator,value]=item.split('-');
            
            if(options.includes(field))
            {
                queryObject[field]={[operator]:Number(value)}
                console.log(queryObject)
            }
            
        });
        console.log('Temp',queryObject)
    }
    //console.log('queryObject',queryObject);
    let result= Product.find(queryObject);
   console.log('Fetched Result',result);
    if(sort)
    {
        const sortList=sort.split(',').join(' ');
result=result.sort(sortList)
       // console.log('sort',sortList);
    }
    else{
        result=result.sort('createdAt')
    }

    //select

    if(field)
    {
        const fielSplited=field.split(',').join(' ');
        result=result.select(fielSplited)
    }


//pagination

const page=Number(req.query.page)||1;
const limit=Number(req.query.limit)||10;
const skip=(page-1)*limit;
result=result.skip(skip).limit(limit);
    const product=await result;

    res.status(200).json({msg :product,nHits:product.length})
}

module.exports={getAllProductsStatic,getAllProducts}