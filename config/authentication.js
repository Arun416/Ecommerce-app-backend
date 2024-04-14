const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (requiredRole)=> (req, res, next)=> {
const tok = req.header('Authorization');
if (!tok) return res.status(401).json({ error: 'No token provided' });
try {
 const token = tok.split(' ')[1];
 const decoded = jwt.verify(token,process.env.JWT_SECRET);
 req.seller_Id = decoded.seller_Id;

if (decoded.role !== requiredRole) {
    return res.status(403).json({
     message: 'You do not have the authorization and permissions to access this resource.'
    });
}

 next();
 } catch (error) {
 res.status(401).json({message:'Invalid Token', error});
 }
 };

module.exports = {authentication};