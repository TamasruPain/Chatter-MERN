const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateToken = require('../lib/tokenUtil')
const cloudinary = require('../lib/cloudinary');

const signup = async (req, res) => {
    const {email, password, fullName} = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).send("All fields are required");
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            fullName: fullName
        })
        if (newUser) {
            //generate token
            await newUser.save();
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({message: "invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Incorrect email or password"});
        }

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Incorrect email"});
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({message: "Incorrect password"});
        }
        //generate token
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

        console.log("Successfully logged in");
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"});

    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({message: "Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: uploadResponse.secure_url},
            {new: true}
        );
        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in updateProfile controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
}