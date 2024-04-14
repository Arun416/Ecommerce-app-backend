const { v4: uuidv4 } = require('uuid');
var  db  = require('../config/db');


function getUniqueId(){
    return uuidv4();
}

const getAllProducts = async(req,res)=>{
    try {

        query = "Select * from products";
        const items = await db.query(query);
        if(!items){
            res.status(400).json({message:"No Products Found"})
        }

        res.status(200).json({success:true, products: items})
    }
    catch(error){
        res.status(500).send(error);
    }
}

//seller products
const getProductsBySeller = async(req,res)=>{
    const sellerId = req.query.seller_Id
    try {
        query = "select * from products where seller_Id =?";

      const item =  await db.query(query,[sellerId])

      if(!item){
        res.status(400).json({message: "No Seller Found"});
      }
      res.status(200).json({success:true,item})
    }
    catch(error) {
        res.status(500).send(error)
    }
}


const getProductDetails = async(req,res)=>{
    
    try {
        const id = req.params.id;  
        query = "SELECT * FROM products WHERE product_ID = ?";
        const item = await db.query(query,[id]);
        console.log(item,"items");
        if(!item){
            res.status(400).json({message: "Not Found"});
        }

        res.status(200).json({success:true,item})
     }
     catch(error){
        res.status(500).send(error)
     }
}

const createProducts = async(req,res)=>{
    try {
         const host = req.headers.host;
         const ofp = req.file.path
         const updatedPath = ofp.replace(/\\/g, '/').slice(7);
        const filePath = req.protocol + "://" + host + '/' + updatedPath; 
        console.log(req.file.path,"req file path")
        const product = {
            product_ID: getUniqueId(),
            product_Name: req.body.product_Name,
            product_Description: req.body.product_Description,
            brand : req.body.brand,
            original_Price: req.body.original_Price,
            discount_Price: req.body.discount_Price,
            product_image: filePath,
            seller_Id: req.body.seller_Id,
            images: req.body.images,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            categoryId: req.body.categoryId,
            countInStock: req.body.countInStock,
            seller_Id: req.body.seller_Id,
            shopName: req.body.shopName
        }
        console.log(product);
        await insertUser(product); 
        res.status(201).json({ message: "Product Created Successfully" });
    }
    catch(error){
        res.status(500).send(error)
    }
}

   // Function to insert user into the database
   const insertUser = async (productData) => {
    const query =
    "INSERT INTO products(product_ID,product_Name, product_Description,product_image,brand,original_Price,discount_Price,seller_Id,categoryId,shopName) VALUES (?,?, ?, ?, ?,?,?,?,?,?)";
    await db.query(query, [
    productData.product_ID,
    productData.product_Name,
    productData.product_Description,
    productData.product_image,
    productData.brand,
    productData.original_Price,
    productData.discount_Price,
    productData.seller_Id,
    productData.categoryId,
    productData.shopName
    ]);
};



const editProduct = async(req,res)=>{
    const id = req.params.id;
  
    console.log(req.body,"updat");
     try { 
        // query  = "update products set product_Name = ?, product_Description = ?,product_image= ?,brand = ?,original_Price = ?,discount_Price = ? ,categoryId = ?,shopName = ?   where  product_ID = ?";
         const payload = {
            product_Name: req.body.product_Name, 
            product_Description: req.body.product_Description,
            brand : req.body.brand,
            original_Price: req.body.original_Price,
            discount_Price: req.body.discount_Price,
            product_image: req.body.product_image,
            seller_Id: req.body.seller_Id,
            images: req.body.images,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            categoryId: req.body.categoryId,
            countInStock: req.body.countInStock,
            shopName: req.body.shopName 
         } 

        await EditSingleProduct(payload,id)

        query = "select * from products";
        await db.query(query);

        res.status(200).json({success:true,message:"Product Update Success"}) 
    
     }
    catch(error){
        res.status(500).send(error)
    } 
}

const EditSingleProduct = async(productData,prodId) =>{
    console.log("product",productData,"id",prodId);
    const query = "UPDATE products SET  ? WHERE product_ID = ? ";
    await db.query(query, [
    productData.product_Name,
    productData.product_Description,
    productData.product_image,
    productData.brand,
    productData.original_Price,
    productData.discount_Price,
    productData.categoryId,
    productData.shopName 
    ]);
}


const deleteProduct = async(req,res)=>{
    const productId = req.params.productId;
    try {
        query = "DELETE FROM products WHERE product_ID = ?";
        const item = await db.query(query,[productId]);
        if(!item){
            res.status(400).json({message:"No Product Found"});
        }
        res.status(200).json({message:"Product Deleted..."})
    }
    catch(error) {
        res.status(500).send(error)
    }
}




module.exports = {getAllProducts,createProducts,getProductDetails,
    editProduct,deleteProduct,getProductsBySeller};