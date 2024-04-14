const express = require('express');
const cors = require('cors');
const routers = require('./routes/users.routes');
const seller_routers = require('./routes/seller.routes')
const product_Routes = require('./routes/product.routes')
const cat_Routes = require('./routes/category.routes')

const connection = require('./config/db')
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'))
app.use('/api',routers)
app.use('/api',seller_routers)
app.use('/api',product_Routes);
app.use('/api',cat_Routes);

app.listen(process.env.PORT,()=>{
    console.log("Server running on Port",process.env.PORT)
})