const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = {
    register: async (req, res) => {
        console.log('Secret Key:', process.env.ACCESS_TOKEN_SECRET_KEY);

        try {
            const { name, email, password } = req.body;

            // Check if email already exists
            const user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "Email already exists." });
            }

            // Validate password length
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters long." });
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new Users({
                name, email, password: passwordHash
            });

            // Save user to the database
            await newUser.save();

            // Generate JWT access and refresh tokens
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            // Set refresh token in a cookie
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',  // This path will be used to send the refresh token
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            });

            // Send the access token in the response
            res.json({ accessToken });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    refreshToken: async (req, res) => {
        try {
            // Access refresh token from the cookies
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) {
                return res.status(400).json({ msg: "Please Login or Register" });
            }

            // Verify the refresh token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" });

                const accessToken = createAccessToken({ id: user.id });
                res.json({ accessToken });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

// Function to create JWT access token
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
}

// Function to create JWT refresh token
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });
}

module.exports = userController;
