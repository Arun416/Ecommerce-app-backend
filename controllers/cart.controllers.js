const createCart = async(req,res)=>{
    try {
        const cartItems = await addCartIntem(req.body);
    }
    catch(error){
        res.status(500).send(error)
    }
}

addCartIntem = async (item)=>{
    const query =
    "INSERT INTO products(product_ID,product_Name, product_Description,product_image,brand,original_Price,discount_Price,categoryId,shopName) VALUES (?,?, ?, ?, ?,?,?,?,?,?)";
    await db.query(query, [
    item.product_ID,
    item.product_Name,
    item.product_Description,
    item.product_image,
    item.brand,
    item.original_Price,
    item.discount_Price,
    item.categoryId,
    ]);
}