const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/users"); // Middleware to authenticate JWT

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Fetch user profile (auth required)
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all users (admin-only route, can add admin auth middleware)
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from DB
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users" });
  }
});

// Delete a user by ID (admin-only route)
router.delete("/:id", async (req, res) => { // Fixed the endpoint here
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

