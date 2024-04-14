const bcrypt = require('bcrypt');
var db  = require('../config/db');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


function getUniqueId(){
      return uuidv4();
}
  
  
const createSellers = async (req, res) => {
    try {
        const sellerId = getUniqueId();
        const email = req.body.email;
        const shopName = req.body.shopName;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        const requestData = {
          seller_Id: sellerId,
          email: email,
          password: hashedPassword,
          shopName: shopName,
          role: "Seller"
        };
    
        // Check if the user already exists
        const existingUser = await getUserByEmail(requestData.email);
    
        if (!existingUser) {
          // Insert the new user into the database
          await insertUser(requestData);
    
          res.status(201).json({ message: "Seller Created Successfully" });
        } else {
          res.status(400).json({ message: "Seller already exists" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Internal Server Error");
      }
  };
    
    // Function to get user by email
  const getUserByEmail = async (email) => {
      const query = "SELECT seller_Id,email, password,role,shopName FROM sellers WHERE email = ?";
      const [result] = await db.query(query, [email]);
      return result[0];
  };
    
  // Function to insert user into the database
  const insertUser = async (requestData) => {
      const query =
        "INSERT INTO sellers(seller_Id, email, password,shopName,role) VALUES (?, ?, ?, ?,?)";
      await db.query(query, [
        requestData.seller_Id,
        requestData.email,
        requestData.password,
        requestData.shopName,
        requestData.role
      ]);
  };
  
  
  
 const login = async (req, res) => {
      try {
        
        const email = req.body.email;
        const password = req.body.password;
    
        // Check if the user already exists
        const ExistUser = await getUserByEmail(email);
    
        if (ExistUser && (await bcrypt.compare(password, ExistUser.password))) {
          // If the password is correct, generate a JWT token
          console.log(ExistUser);
          const token = generateJWTToken(ExistUser);
    
          res.status(200).json({ data:ExistUser,token: token, message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Internal Server Error");
      }
    };
  
     
  // Function to generate JWT token
  const generateJWTToken = (user) => {
      // Use a library like jsonwebtoken to generate a JWT token
      // For example, assuming you have a secret key
      const jwtPayload = { seller_Id: user.seller_Id,email:user.email,role:user.role,shopName:user.shopName };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
      return token;
  };
  
  
  module.exports =  {createSellers,login}