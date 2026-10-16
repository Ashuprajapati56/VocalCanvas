import React, { useState, useRef } from 'react';

const VerbalPractice = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const recognitionRef = useRef(null);

    const startRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support speech recognition. Please use Google Chrome.");
            return;
        }

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
            console.error("Speech recognition error", event.error);
            setIsRecording(false);
        };

        recognition.onend = () => setIsRecording(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    // AI se feedback mangwane ka function
    const getAIFeedback = async () => {
        if (!transcript) {
            alert("Pehle thoda English mein baat toh karo! 🎤");
            return;
        }

        setIsAnalyzing(true);
        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                setFeedback(data.feedback);
            } else {
                alert("AI Error: " + (data.message || "Something went wrong"));
            }
        } catch (error) {
            console.error("Feedback error:", error);
            alert("Network Error: Could not reach the AI server.");
        }
        setIsAnalyzing(false);
    };

    return (
        <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
            <h2 style={{ color: '#123b73', fontSize: '32px', marginBottom: '10px' }}>Verbal Practice Arena 🎙️</h2>
            <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px' }}>
                Speak naturally. Our AI is listening to your English.
            </p>
            
            <div style={{ marginBottom: '30px' }}>
                {!isRecording ? (
                    <button 
                        onClick={startRecording}
                        style={{ padding: '15px 35px', backgroundColor: '#123b73', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '17px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(18,59,115,0.3)' }}
                    >
                        🎤 Start Speaking
                    </button>
                ) : (
                    <button 
                        onClick={stopRecording}
                        style={{ padding: '15px 35px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '17px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(239,68,68,0.3)', animation: 'pulse 1.5s infinite' }}
                    >
                        ⏹️ Stop Recording
                    </button>
                )}
            </div>

            {/* Transcript Box */}
            <div style={{ width: '100%', maxWidth: '700px', minHeight: '150px', margin: '0 auto', padding: '25px', border: '2px dashed #cbd5e1', borderRadius: '16px', backgroundColor: 'white', textAlign: 'left', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#f59e0b', fontSize: '18px' }}>Live Transcript:</h4>
                <p style={{ color: '#334155', fontSize: '18px', lineHeight: '1.6' }}>
                    {transcript || "Your speech will appear here..."}
                </p>
            </div>

            {/* AI Action Button */}
            {transcript && !isRecording && (
                <button 
                    onClick={getAIFeedback}
                    disabled={isAnalyzing}
                    style={{ padding: '15px 40px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnalyzing ? 'not-allowed' : 'pointer', fontSize: '18px', fontWeight: 'bold', transition: 'all 0.3s', opacity: isAnalyzing ? 0.7 : 1 }}
                >
                    {isAnalyzing ? "🧠 AI is Analyzing..." : "✨ Get AI Feedback"}
                </button>
            )}

            {/* AI Feedback Box */}
            {feedback && (
                <div style={{ width: '100%', maxWidth: '700px', margin: '30px auto 0', padding: '30px', borderRadius: '16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', textAlign: 'left', whiteSpace: 'pre-line' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>📊 Your Performance Coach:</h3>
                    <div style={{ color: '#1e40af', fontSize: '16px', lineHeight: '1.7' }}>
                        {feedback}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerbalPractice;