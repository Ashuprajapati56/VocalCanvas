import React, { useState, useRef, useEffect } from 'react';

// Personal Practice Coach Prompts (Section 5.A & 5.C)
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
    // Coach States
    const [category, setCategory] = useState("Daily Conversation");
    const [difficulty, setDifficulty] = useState("Easy");
    const [promptIndex, setPromptIndex] = useState(0);
    const [showHindi, setShowHindi] = useState(false);

    // Practice States
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const recognitionRef = useRef(null);

    // Filter prompts based on category and difficulty
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
                    setErrorMsg("🚫 Microphone permission was denied. Please allow mic access in your browser settings or type your response below.");
                } else if (event.error === 'no-speech') {
                    setErrorMsg("🎤 No speech was detected. Please check your microphone or type your answer below.");
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
            // Yahan clean URL set kar diya hai
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
                        // Yahan bhi clean URL set kar diya hai
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
            setErrorMsg("❌ Network Error: Could not connect to the backend server. Is node server.js running?");
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
        <div style={{ padding: '35px 20px', minHeight: '85vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h2 style={{ color: '#123b73', fontSize: '30px', marginBottom: '8px' }}>Personal Practice Coach 🎙️</h2>
                    <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
                        Choose a goal, speak or type your response, review AI guidance, and retry to improve.
                    </p>
                </div>

                {/* 1. Goal & Difficulty Controls (Section 5.A & 5.C) */}
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        
                        {/* Goal Tabs */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {Object.keys(PRACTICE_PROMPTS).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setCategory(cat); setErrorMsg(''); }}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        backgroundColor: category === cat ? '#123b73' : '#f1f5f9',
                                        color: category === cat ? 'white' : '#475569'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Difficulty & Hindi Toggle */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select 
                                value={difficulty} 
                                onChange={(e) => setDifficulty(e.target.value)}
                                aria-label="Select Difficulty"
                                style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 'bold', color: '#123b73' }}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Normal">Normal</option>
                                <option value="Challenge">Challenge</option>
                            </select>

                            <button
                                onClick={() => setShowHindi(!showHindi)}
                                style={{ padding: '7px 12px', borderRadius: '8px', border: '1px solid #f59e0b', backgroundColor: showHindi ? '#fef3c7' : 'white', color: '#b45309', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                            >
                                {showHindi ? "Hide Hindi" : "🇮🇳 Hindi Help"}
                            </button>
                        </div>
                    </div>

                    {/* Prompt Card */}
                    <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #f59e0b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '240px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#f59e0b', display: 'block', marginBottom: '4px' }}>
                                Current Prompt ({difficulty}):
                            </span>
                            <p style={{ margin: 0, fontSize: '17px', color: '#1e293b', fontWeight: '600' }}>
                                "{currentPrompt?.text}"
                            </p>
                            {showHindi && (
                                <p style={{ margin: '6px 0 0 0', fontSize: '15px', color: '#475569' }}>
                                    💡 {currentPrompt?.hindi}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleSkipPrompt}
                            style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                        >
                            ⏭️ Skip Task
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                    <div role="alert" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '15px', fontWeight: '500' }}>
                        {errorMsg}
                    </div>
                )}

                {/* 2. Microphone & Action Controls (Section 4.3) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {!isRecording ? (
                        <button 
                            onClick={startRecording}
                            style={{ padding: '13px 28px', backgroundColor: '#123b73', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(18,59,115,0.25)' }}
                        >
                            🎤 Start Speaking
                        </button>
                    ) : (
                        <button 
                            onClick={stopRecording}
                            style={{ padding: '13px 28px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(239,68,68,0.25)' }}
                        >
                            ⏹️ Stop Recording (Listening...)
                        </button>
                    )}

                    <button 
                        onClick={handleClear}
                        disabled={!transcript && !feedback}
                        style={{ padding: '13px 22px', backgroundColor: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '50px', cursor: (!transcript && !feedback) ? 'not-allowed' : 'pointer', fontSize: '15px', fontWeight: 'bold', opacity: (!transcript && !feedback) ? 0.6 : 1 }}
                    >
                        🗑️ Clear Transcript
                    </button>
                </div>

                {/* 3. Editable Transcript & Typed Fallback Box (Section 4.3 & 5.G) */}
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', border: '2px dashed #cbd5e1', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label htmlFor="transcript-input" style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '16px' }}>
                            Your Response (Speak or Type / Edit below):
                        </label>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>
                            {transcript.length}/2000 chars
                        </span>
                    </div>
                    <textarea
                        id="transcript-input"
                        rows="4"
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        placeholder="Click 'Start Speaking' to use your microphone, or type your English response directly here..."
                        style={{ width: '100%', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#1e293b', lineHeight: '1.5', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                    />
                </div>

                {/* Submit for AI Feedback Button */}
                {!isRecording && (
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                        <button 
                            onClick={getAIFeedback}
                            disabled={isAnalyzing || !transcript.trim()}
                            style={{ padding: '14px 36px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '10px', cursor: (isAnalyzing || !transcript.trim()) ? 'not-allowed' : 'pointer', fontSize: '17px', fontWeight: 'bold', opacity: (isAnalyzing || !transcript.trim()) ? 0.65 : 1 }}
                        >
                            {isAnalyzing ? "🧠 AI Coach is Analyzing..." : "✨ Get AI Feedback"}
                        </button>
                    </div>
                )}

                {/* 4. AI Feedback & Retry Section (Section 4.4 & 5.B) */}
                {feedback && (
                    <div style={{ padding: '25px', borderRadius: '16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, color: '#1e3a8a', fontSize: '20px' }}>📊 Your Performance Coach:</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={toggleSpeech}
                                    style={{ padding: '8px 14px', backgroundColor: isSpeaking ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                                >
                                    {isSpeaking ? "⏹️ Stop Audio" : "🔊 Read Feedback"}
                                </button>
                                <button 
                                    onClick={handleRetry}
                                    style={{ padding: '8px 14px', backgroundColor: '#123b73', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                                >
                                    🔄 Retry Improved Sentence
                                </button>
                            </div>
                        </div>

                        {/* Honest Disclaimer (Section 4.4 & 11) */}
                        <div style={{ fontSize: '13px', color: '#475569', backgroundColor: '#dbeafe', padding: '8px 12px', borderRadius: '6px', marginBottom: '15px' }}>
                            ℹ️ <strong>Note:</strong> Scores are approximate text-based guidance. A transcript alone cannot measure voice tone or actual speaking confidence.
                        </div>

                        <div style={{ color: '#1e40af', fontSize: '16px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                            {feedback}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VerbalPractice;