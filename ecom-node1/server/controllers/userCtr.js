const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
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

            res.json({ msg: "Registration successful." });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = userController;
