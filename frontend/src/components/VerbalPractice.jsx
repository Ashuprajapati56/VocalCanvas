import React, { useState, useRef, useEffect } from 'react';
import './VerbalPractice.css';

const PRACTICE_PROMPTS = {
    "Daily Conversation": [
        { level: "Easy", text: "Introduce yourself to a new classmate on your first day of college.", hindi: "कॉलेज के पहले दिन एक नए सहपाठी को अपना परिचय दें।" },
        { level: "Normal", text: "Ask your professor for a two-day extension on your project submission.", hindi: "अपने प्रोफेसर से प्रोजेक्ट जमा करने के लिए दो दिन का अतिरिक्त समय मांगें।" },
        { level: "Challenge", text: "Participate in a group discussion about the pros and cons of online learning.", hindi: "ऑनलाइन पढ़ाई के फायदे और नुकसान पर ग्रुप डिस्कशन में अपनी राय रखें।" }
    ],
    "Interview Prep": [
        { level: "Easy", text: "Tell me about yourself and why you chose engineering.", hindi: "अपने बारे में बताएं और आपने इंजीनियरिंग क्यों चुनी?" },
        { level: "Normal", text: "Explain your Vocal Canvas MERN stack project clearly to an interviewer.", hindi: "इंटरव्यूअर को अपना Vocal Canvas प्रोजेक्ट आसान शब्दों में समझाएं।" },
        { level: "Challenge", text: "Describe a technical conflict or bug you faced in a team project and how you solved it.", hindi: "टीम प्रोजेक्ट में आई किसी तकनीकी समस्या और उसके समाधान के बारे में बताएं।" }
    ],
    "Presentation": [
        { level: "Easy", text: "Give a 30-second opening hook for a seminar on Artificial Intelligence.", hindi: "आर्टिफिशियल इंटेलिजेंस सेमिनार के लिए 30 सेकंड की आकर्षक शुरुआत करें।" },
        { level: "Normal", text: "Explain how your web application's architecture works from frontend to database.", hindi: "बताएं कि आपके वेब ऐप का आर्किटेक्चर फ्रंटएंड से डेटाबेस तक कैसे काम करता है।" },
        { level: "Challenge", text: "Conclude a technical presentation and invite questions from the audience confidently.", hindi: "एक तकनीकी प्रेजेंटेशन का समापन करें और दर्शकों को सवाल पूछने के लिए आमंत्रित करें।" }
    ],
    "Verbal Aptitude": [
        { level: "Easy", text: "Use the words 'Collaborate' and 'Consistent' in a meaningful sentence about college life.", hindi: "कॉलेज लाइफ के बारे में एक वाक्य में 'Collaborate' और 'Consistent' शब्दों का प्रयोग करें।" },
        { level: "Normal", text: "Summarize the importance of good communication skills for placement exams in 3 sentences.", hindi: "प्लेसमेंट परीक्षाओं के लिए अच्छे कम्युनिकेशन स्किल्स के महत्व को 3 वाक्यों में बताएं।" },
        { level: "Challenge", text: "Speak for one minute on why critical thinking is as important as coding skills.", hindi: "एक मिनट तक बोलें कि क्रिटिकल थिंकिंग कोडिंग स्किल्स जितनी ही महत्वपूर्ण क्यों है।" }
    ]
};

const VerbalPractice = () => {
    const [category, setCategory] = useState("Daily Conversation");
    const [difficulty, setDifficulty] = useState("Easy");
    const [promptIndex, setPromptIndex] = useState(0);
    const [showHindi, setShowHindi] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const recognitionRef = useRef(null);
    const categoryPrompts = PRACTICE_PROMPTS[category] || [];
    const currentPrompt = categoryPrompts.find(p => p.level === difficulty) || categoryPrompts[promptIndex % categoryPrompts.length];

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const handleSkipPrompt = () => {
        const levels = ["Easy", "Normal", "Challenge"];
        const nextLevelIndex = (levels.indexOf(difficulty) + 1) % levels.length;
        setDifficulty(levels[nextLevelIndex]);
        setPromptIndex(prev => prev + 1);
        setErrorMsg('');
    };

    const startRecording = () => {
        setErrorMsg('');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            setErrorMsg("⚠️ Your browser doesn't support microphone speech recognition. Don't worry! You can type your answer directly in the box below.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsRecording(true);
            
            recognition.onresult = (event) => {
                let currentTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                if (event.error === 'not-allowed') {
                    setErrorMsg("🚫 Microphone permission was denied. Please allow mic access in your browser settings.");
                } else if (event.error === 'no-speech') {
                    setErrorMsg("🎤 No speech was detected. Please check your microphone.");
                } else {
                    setErrorMsg(`⚠️ Microphone error (${event.error}). You can edit or type your text below.`);
                }
                setIsRecording(false);
            };

            recognition.onend = () => setIsRecording(false);
            recognitionRef.current = recognition;
            recognition.start();
        } catch (err) {
            setErrorMsg("⚠️ Could not start microphone. Please use the text box to type your response.");
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleClear = () => {
        stopRecording();
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setTranscript('');
        setFeedback(null);
        setErrorMsg('');
    };

    const handleRetry = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setFeedback(null);
        setErrorMsg('');
    };

    const getAIFeedback = async () => {
        if (!transcript.trim()) {
            setErrorMsg("⚠️ Please speak or type at least one sentence before requesting feedback.");
            return;
        }

        setErrorMsg('');
        setIsAnalyzing(true);
        try {
            const response = await fetch('https://vocalcanvas.onrender.com/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    transcript: transcript.trim(),
                    category,
                    promptText: currentPrompt?.text
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                setFeedback(data.feedback);
                const userId = localStorage.getItem('userId');
                if (userId) {
                    try {
                        await fetch('https://vocalcanvas.onrender.com/api/history', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                userId: userId, 
                                transcript: transcript.trim(), 
                                feedback: data.feedback 
                            })
                        });
                    } catch (err) {
                        console.error("Failed to save history in DB:", err);
                    }
                }
            } else {
                setErrorMsg("❌ AI Error: " + (data.message || "Something went wrong."));
            }
        } catch (error) {
            console.error("Feedback error:", error);
            setErrorMsg("❌ Network Error: Could not connect to the backend server.");
        }
        setIsAnalyzing(false);
    };

    const toggleSpeech = () => {
        if (!feedback) return;
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(feedback);
            utterance.lang = 'en-US';
            utterance.rate = 0.95;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <div className="vp-container">
            <div className="vp-content">
                <div className="vp-header">
                    <h2 className="vp-title">Personal Practice Coach 🎙️</h2>
                    <p className="vp-subtitle">Choose a goal, speak or type your response, review AI guidance, and retry to improve.</p>
                </div>

                <div className="vp-controls-card">
                    <div className="vp-controls-row">
                        <div className="vp-tabs-group">
                            {Object.keys(PRACTICE_PROMPTS).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setCategory(cat); setErrorMsg(''); }}
                                    className={`vp-tab-btn ${category === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="vp-diff-group">
                            <select 
                                value={difficulty} 
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="vp-select"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Normal">Normal</option>
                                <option value="Challenge">Challenge</option>
                            </select>

                            <button
                                onClick={() => setShowHindi(!showHindi)}
                                className={`vp-hindi-btn ${showHindi ? 'active' : ''}`}
                            >
                                {showHindi ? "Hide Hindi" : "🇮🇳 Hindi Help"}
                            </button>
                        </div>
                    </div>

                    <div className="vp-prompt-card">
                        <div className="vp-prompt-text-wrapper">
                            <span className="vp-prompt-label">Current Prompt ({difficulty}):</span>
                            <p className="vp-prompt-text">"{currentPrompt?.text}"</p>
                            {showHindi && <p className="vp-prompt-hindi">💡 {currentPrompt?.hindi}</p>}
                        </div>
                        <button onClick={handleSkipPrompt} className="vp-skip-btn">⏭️ Skip Task</button>
                    </div>
                </div>

                {errorMsg && <div className="vp-error-banner" role="alert">{errorMsg}</div>}

                <div className="vp-mic-controls">
                    {!isRecording ? (
                        <button onClick={startRecording} className="vp-action-btn start">🎤 Start Speaking</button>
                    ) : (
                        <button onClick={stopRecording} className="vp-action-btn stop">⏹️ Stop Recording (Listening...)</button>
                    )}
                    <button 
                        onClick={handleClear} 
                        disabled={!transcript && !feedback} 
                        className="vp-action-btn clear"
                    >
                        🗑️ Clear Transcript
                    </button>
                </div>

                <div className="vp-transcript-box">
                    <div className="vp-transcript-header">
                        <label htmlFor="transcript-input" className="vp-transcript-label">Your Response (Speak or Type / Edit below):</label>
                        <span className="vp-transcript-count">{transcript.length}/2000 chars</span>
                    </div>
                    <textarea
                        id="transcript-input"
                        rows="4"
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        placeholder="Click 'Start Speaking' to use your microphone, or type your English response directly here..."
                        className="vp-textarea"
                    />
                </div>

                {!isRecording && (
                    <div className="vp-submit-wrapper">
                        <button 
                            onClick={getAIFeedback} 
                            disabled={isAnalyzing || !transcript.trim()} 
                            className="vp-submit-btn"
                        >
                            {isAnalyzing ? "🧠 AI Coach is Analyzing..." : "✨ Get AI Feedback"}
                        </button>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="vp-loader-card">
                        <h3 className="vp-loader-title">🧠 AI Coach is Analyzing...</h3>
                        <p className="vp-loader-text">Evaluating your grammar, tone, and vocabulary. Please wait a few seconds ⏳</p>
                    </div>
                )}

                {feedback && (
                    <div className="vp-feedback-wrapper">
                        <div className="vp-feedback-header">
                            <h3 className="vp-feedback-title">📊 Your Performance Coach:</h3>
                            <div className="vp-feedback-actions">
                                <button onClick={toggleSpeech} className={`vp-audio-btn ${isSpeaking ? 'active' : ''}`}>
                                    {isSpeaking ? "⏹️ Stop Audio" : "🔊 Read Feedback"}
                                </button>
                                <button onClick={handleRetry} className="vp-retry-btn">🔄 Retry Improved Sentence</button>
                            </div>
                        </div>
                        <div className="vp-disclaimer">
                            ℹ️ <strong>Note:</strong> Scores are approximate text-based guidance. A transcript alone cannot measure voice tone or actual speaking confidence.
                        </div>
                        <div className="vp-feedback-text">{feedback}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerbalPractice;