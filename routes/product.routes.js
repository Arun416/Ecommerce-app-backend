const router = require('express').Router();
const {createProducts,editProduct,getAllProducts,getProductDetails,deleteProduct,
    getProductsBySeller} = require('../controllers/product.controllers')
const {authentication} = require('../config/authentication')
const multerInstance = require('../config/multer');



router.get('/all_products',getAllProducts);
router.get('/product/:id',getProductDetails);
router.post('/products',authentication('Seller'),multerInstance.upload.single('product_image'),createProducts);
router.patch('/product/edit/:id',multerInstance.upload.single('product_image'),authentication('Seller'),editProduct);
router.delete('/product/:productId/remove',authentication('Seller'),deleteProduct);
router.get('/myProducts',getProductsBySeller)


module.exports = router;


