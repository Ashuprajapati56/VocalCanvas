const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
const PracticeHistory = require('./models/PracticeHistory'); 

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
  });
});

// --- USER SIGNUP API ---
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

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

// --- USER LOGIN API ---
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

// =========================================================
// UPDATED: VERBAL PRACTICE FEEDBACK ROUTE (STAR Method & Filler Words)
// =========================================================
app.post('/api/feedback', async (req, res) => {
    const { transcript, category, promptText } = req.body;

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Transcript cannot be empty. Please speak or type your answer.' 
        });
    }

    if (transcript.length > 2000) {
        return res.status(400).json({ 
            success: false, 
            message: 'Transcript is too long (max 2000 characters). Please keep your response concise.' 
        });
    }

    console.log(`Received transcript [${category || 'General'}]:`, transcript);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-pro", // Corrected model name
            contents: `
You are an expert English communication and interview coach preparing college students for product-based tech companies.

Activity Goal: ${category || 'General Speaking'}
Prompt Given to Student: "${promptText || 'Free speaking practice'}"
Student's Response Transcript: "${transcript.trim()}"

Analyze the transcript and provide structured feedback in this EXACT format:

📊 Performance Metrics:
- Grammar & Sentence Construction: X/10
- Vocabulary & Professionalism: X/10
- Filler Words Detected: Count and list them (e.g., "um", "uh", "like", "basically"). If none, say "Great job! No filler words detected."
- STAR Method Check: (Evaluate only if Activity Goal is "Interview Prep". State if Situation, Task, Action, and Result were covered or what was missing. If not an interview prompt, say "Not applicable for this prompt.")

✅ What you did well:
- Give 1-2 short, encouraging points.

🛠️ Areas for Improvement:
- Give 1-2 specific, actionable tips to fix grammar, pacing, or structure.

💡 Professional Revision:
- Provide a natural, confident, and professional version of the student's answer.

🎯 Next Step:
- Give one quick challenge or focus area for their next attempt.
`
        });

        const feedback = response.text;

        res.json({
            success: true,
            feedback: feedback
        });

    } catch (error) {
        console.error('Gemini Error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to generate AI feedback. Please try again.'
        });
    }
});

// ==========================================
// HISTORY ROUTES (SAVE, FETCH & DELETE)
// ==========================================

app.post('/api/history', async (req, res) => {
    try {
        const { userId, transcript, feedback } = req.body;

        if (!userId || !transcript || !feedback) {
            return res.status(400).json({ success: false, message: "Missing required history fields" });
        }
        
        const newHistory = new PracticeHistory({
            userId,
            transcript,
            feedback
        });

        await newHistory.save();
        res.status(201).json({ success: true, message: "History saved successfully!" });
    } catch (error) {
        console.error("History Save Error:", error);
        res.status(500).json({ success: false, message: "Failed to save history" });
    }
});

app.get('/api/history/:userId', async (req, res) => {
    try {
        const history = await PracticeHistory.find({ userId: req.params.userId }).sort({ date: -1 });
        res.json({ success: true, data: history });
    } catch (error) {
        console.error("Fetch History Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch history" });
    }
});

app.delete('/api/history/:id', async (req, res) => {
    try {
        await PracticeHistory.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "History item deleted successfully!" });
    } catch (error) {
        console.error("Delete History Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete history item" });
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});