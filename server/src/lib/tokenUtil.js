const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.cookie("jwt",token,{
        httpOnly: true, //prevents xss attacks cross-site scripting
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "Strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' for cross-site
        // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    return token;
}

module.exports = generateToken;