const bcrypt = require('bcrypt');
var  db  = require('../config/db');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const getUser = async(req,res)=>{
  const email = req.query.email
    try{
      query = "select * from users where email = ?"

      const result = await  db.query(query,[email]);

      if(!result){
        res.status(400).send("Invalid User")
      }
      else{
        res.status(200).json({data: result[0]})
      }
    }
    catch(error){
      res.status(500).json({error,message:"Something went wrong"});
    }
}

/* function getUniqueId(){
    return (new Date().getTime()).toString(36) + new Date().getUTCMilliseconds();
 } */

 function getUniqueId(){
  return uuidv4();
}


 const createUsers = async (req, res) => {
    try {
      const userId = getUniqueId();
      const user = req.body.username;
      const email = req.body.email;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const requestData = {
        user_Id: userId,
        username: user,
        email: email,
        password: hashedPassword,
        role: "User"
      };
  
      // Check if the user already exists
      const existingUser = await getUserByEmail(requestData.email);
  
      if (!existingUser) {
        // Insert the new user into the database
        await insertUser(requestData);
  
        res.status(201).json({ message: "User Created Successfully" });
      } else {
        res.status(400).json({ message: "User already exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message || "Internal Server Error");
    }
  };
  
  // Function to get user by email
  const getUserByEmail = async (email) => {
    const query = "SELECT user_Id,username, email,role,password FROM users WHERE email = ?";
    const [result] = await db.query(query, [email]);
    return result[0];
  };
  
  // Function to insert user into the database
  const insertUser = async (requestData) => {
    const query =
      "INSERT INTO users(user_Id,username, email, password,role) VALUES (?, ?, ?, ?,?)";
    await db.query(query, [
      requestData.user_Id,
      requestData.username,
      requestData.email,
      requestData.password,
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
        console.log(ExistUser,"exist user");
        // If the password is correct, generate a JWT token
        const token = generateJWTToken(ExistUser);
  
        res.status(200).json({ data: ExistUser,token: token, message: "Login successful" });
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
    console.log(user,"use");
    const jwtPayload = { user_Id: user.user_Id, username: user.username,email:user.email };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };


module.exports =  {createUsers,login,getUser}