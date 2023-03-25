import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class userConttroler {

// Signup endpoint

    static userSignup = async (req, res) => {
        const { name, email, password } = req.body;

        // Check if user with the given email already exists
        const user = await UserModel.findOne({ email: email });
        if (user !== null) {
            // User already exists, return error response
            res.status(409).send({ status: "error", message: "Email already exists" });
        } else {
            // User does not exist, create a new user
            if (name && email && password) {
                try {
                    // Hash the password using bcrypt
                    const salt = await bcrypt.genSalt(15);
                    const hashPassword = await bcrypt.hash(password, salt);

                    // Create a new user and save it to the database
                    const newUser = UserModel({
                        name: name,
                        email: email,
                        password: hashPassword
                    });
                    await newUser.save();

                const save_user= await UserModel.findOne({email:email})
                // genrate JWT token
                const token =jwt.sign({userId:save_user._id}, `${process.env.JWT_SECRET_KEY}`, { expiresIn:'15d' })

                    // User created successfully, return success response
                    res.status(201).send({ status: "success", message: "User created successfully", "token":token });
                } catch (error) {
                    // An error occurred while creating the user, return error response
                    console.log(error);
                    res.status(500).send({ status: "error", message: "Unable to signup, please try again later" });
                }
            } else {
                // Name, email and/or password not provided, return error response
                res.status(400).send({ status: "error", message: "Name, email and password are required" });
            }
        }
    };



 // Login endpoint
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if email and password are provided
            if (email && password) {
                // Find the user by email
                const user = await UserModel.findOne({ email: email });

                // If user is found, check if the password matches
                if (user !== null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {

                
                        // genrate JWT token
                        const token =jwt.sign({userId:user._id}, `${process.env.JWT_SECRET_KEY}`, { expiresIn:'15d' })


                        // Password matches, return success response
                        res.status(200).send({ status: "success", message: "You are logged in","token":token  });
                    } else {
                        // Password does not match, return error response
                        res.status(401).send({ status: "error", message: "Email and password do not match" });
                    }
                } else {
                    // User not found, return error response
                    res.status(404).send({ status: "error", message: "User not found, please register" });
                }
            } else {
                // Email and/or password not provided, return error response
                res.status(400).send({ status: "error", message: "Email and password are required" });
            }
        } catch (error) {
            // An error occurred, return error response
            console.log(error);
            res.status(500).send({ status: "error", message: "Unable to login, please try again later" });
        }
    };



}

export default userConttroler;
