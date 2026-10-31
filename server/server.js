const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// FIXED: Added database name (signup-app), closed the string quote, and closed the parenthesis properly
mongoose.connect('mongodb://adarsh-m-jain:adarsh1234@ac-zs09ftf-shard-00-00.trzjjmw.mongodb.net:27017,ac-zs09ftf-shard-00-01.trzjjmw.mongodb.net:27017,ac-zs09ftf-shard-00-02.trzjjmw.mongodb.net:27017/?ssl=true&replicaSet=atlas-v1g02y-shard-0&authSource=admin')
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch((err) => console.error('MongoDB connection error:', err));

// 1. SIGN UP ROUTE
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists! Please log in instead." });
    }

    // Create and save new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. LOG IN ROUTE (Checks if signed up first)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with this email. Please sign up first!" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    res.status(200).json({ message: "Log in successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));