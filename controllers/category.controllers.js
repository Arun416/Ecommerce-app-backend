var  db  = require('../config/db');


const getAllCategory = async(req,res)=>{
    const prodId = req.query.product_ID
    try{
        query = "select * from categories";

      let item = await db.query(query);

      if(!item){
        res.status(400).json({message:"Not Categories Found"})
      }

      res.status(200).json({success:true,item})
    }
    catch(error){
        res.status(500).send(error);
    }
}

module.exports = {getAllCategory}