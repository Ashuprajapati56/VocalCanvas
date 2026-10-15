const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const app = express();

app.use(cors());
app.use(express.json());

// --- HOME TEST ROUTE ---
app.get('/', (req, res) => {
  res.json({
    message: 'Vocal Canvas backend is running!'
  })
});

// --- USER SIGNUP API ---
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        
        console.log("New User Registered:", email);
        res.status(201).json({ message: "User registered successfully! 🎉" });

    } catch (error) {
        console.error("Sign-up Error:", error);
        res.status(500).json({ message: "Server Error during registration" });
    }
});

// --- USER LOGIN API (Ab yeh baahar aur alag hai) ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found! Pehle sign up karo." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials (Galat password)!" });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'vocalcanvas_super_secret_key', 
            { expiresIn: '1d' }
        );

        console.log("User Logged In:", email);
        res.json({
            message: "Login Successful! 🎉",
            token: token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error during login" });
    }
});

// --- VERBAL PRACTICE FEEDBACK ROUTE ---
app.post('/api/feedback', async (req, res) => {
    const { transcript } = req.body

    console.log('Received transcript:', transcript)

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: `
You are an English speaking coach for college students.

Analyze the following spoken English transcript:

"${transcript}"

Give feedback in this exact format:

Grammar: X/10
Fluency: X/10
Vocabulary: X/10
Confidence: X/10

What you did well:
- Give 2 short points

Improve this:
- Give 2 short points

Better sentence:
- Give one improved version of the student's sentence.

Keep the feedback simple, encouraging and easy for a beginner to understand.
`
        })

        const feedback = response.text

        console.log('AI Feedback:', feedback)

        res.json({
            success: true,
            feedback: feedback
        })

    } catch (error) {
        console.error('Gemini Error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to generate AI feedback'
        })
    }
});

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      console.log('MongoDB Connected Successfully! 🚀');
  })
  .catch((err) => {
      console.error('MongoDB Connection Error ❌:', err);
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
s