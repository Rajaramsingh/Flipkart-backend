const User = require("../models/user");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs")



async function handleUserSignup(req,res){
    const { name, email ,password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({error: "All fields are required"})
    }
    try {
       

        // create new user
        await User.create({
            name,
            email,
            password,
        });
        

        return res.status(201).json({message: "User created successfully"})
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({error: "server error"})
    }
   
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({error: "Email and passwors are required"})
    }
   
    try{
        const user = await User.findOne({email});

        if (!user) {
            console.log("No user found with email", email)
            return res.status(401).json({ error: "Invalid Email" });
        }
        console.log("user's Hashed Password", user.password)

        // Compare password
        const isMatch = await user.comparePassword(password);
        console.log("Password Match",isMatch)
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Email or Password" })
    
        }


        // Generate Jwt Token 
        const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET,{
            expiresIn: '1h'
        });
        console.log("JWT token here:", token)

        // set JWT token in a cookie
        res.cookie("token", token,{httpOnly: true, secure: process.env.NODE_ENV === 'production'});

        return res.status(200).json({message: "login Successful"})   

    }
    
    catch (error) {
        console.error(error);
        return res.status(500).json({error:"server error"})
    }
   
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}