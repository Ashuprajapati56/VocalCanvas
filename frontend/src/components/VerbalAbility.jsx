import React, { useState, useEffect } from 'react';
import './VerbalAbility.css';

const QUESTION_BANK = [
    {
        id: 1, topic: "Synonyms & Vocabulary", difficulty: "Easy",
        question: "Choose the word most similar in meaning (Synonym) to: 'PRAGMATIC'",
        options: ["Idealistic", "Practical", "Emotional", "Uncertain"],
        correct: 1, explanation: "'Pragmatic' means dealing with things sensibly and realistically (Practical)."
    },
    {
        id: 2, topic: "Grammar & Fill-in-the-Blanks", difficulty: "Easy",
        question: "Neither the project lead nor the team members _______ present at yesterday's review meeting.",
        options: ["was", "were", "is", "has been"],
        correct: 1, explanation: "With 'Neither...nor', the verb agrees with the closer subject ('team members' is plural, needs 'were')."
    },
    {
        id: 3, topic: "Sentence Correction", difficulty: "Normal",
        question: "Identify the grammatically correct sentence for a formal interview:",
        options: ["I am having three years of experience in coding.", "I have three years of experience in software development.", "Myself Ashu and I am good in coding.", "I discussed about the database issue with my team."],
        correct: 1, explanation: "'Have' is state of possession. 'Myself' cannot be a subject. 'Discuss' takes no preposition."
    },
    {
        id: 4, topic: "Antonyms (GATE Aptitude)", difficulty: "Normal",
        question: "Select the word opposite in meaning (Antonym) to: 'EPHEMERAL'",
        options: ["Short-lived", "Permanent", "Fragile", "Transparent"],
        correct: 1, explanation: "'Ephemeral' means short-lived. Opposite is 'Permanent'."
    },
    {
        id: 5, topic: "Critical Verbal Reasoning", difficulty: "Challenge",
        question: "Despite the _______ nature of the legacy codebase, the intern managed to _______ the critical bug before the deadline.",
        options: ["convoluted ... rectify", "simple ... aggravate", "transparent ... obscure", "modern ... ignore"],
        correct: 0, explanation: "'Despite' signals contrast. 'convoluted' (complex) contrasts with managing to 'rectify' (fix)."
    },
    {
        id: 6, topic: "Sentence Ordering", difficulty: "Challenge",
        question: "Arrange P, Q, R, S:\n(P) before deploying to production\n(Q) software engineers must thoroughly validate\n(R) to prevent unexpected runtime crashes\n(S) all user inputs on the server",
        options: ["Q - S - P - R", "P - Q - R - S", "S - Q - R - P", "Q - P - S - R"],
        correct: 0, explanation: "'Q-S-P-R' reads: Engineers validate (Q) inputs (S) before deploying (P) to prevent crashes (R)."
    }
];

const VerbalAbility = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [timedMode, setTimedMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [missedQuestions, setMissedQuestions] = useState([]);

    const filteredQuestions = selectedDifficulty === "All" ? QUESTION_BANK : QUESTION_BANK.filter(q => q.difficulty === selectedDifficulty);
    const currentQ = filteredQuestions[currentIndex];

    useEffect(() => {
        if (!timedMode || isSubmitted || quizFinished) return;
        if (timeLeft === 0) { handleAutoSubmitTimeout(); return; }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timedMode, timeLeft, isSubmitted, quizFinished]);

    const handleAutoSubmitTimeout = () => {
        setIsSubmitted(true);
        if (currentQ && !missedQuestions.some(q => q.id === currentQ.id)) setMissedQuestions(prev => [...prev, currentQ]);
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
        if (selectedOption === currentQ.correct) {
            setScore(prev => prev + 1);
        } else {
            if (!missedQuestions.some(q => q.id === currentQ.id)) setMissedQuestions(prev => [...prev, currentQ]);
        }
    };

    const handleNext = () => {
        if (currentIndex + 1 < filteredQuestions.length) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
            setTimeLeft(45);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = (newDifficulty = selectedDifficulty) => {
        setSelectedDifficulty(newDifficulty);
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setScore(0);
        setQuizFinished(false);
        setMissedQuestions([]);
        setTimeLeft(45);
    };

    const getOptionClass = (idx) => {
        if (!isSubmitted) return selectedOption === idx ? 'option-btn selected' : 'option-btn';
        if (idx === currentQ.correct) return 'option-btn correct';
        if (idx === selectedOption) return 'option-btn incorrect';
        return 'option-btn';
    };

    return (
        <div className="verbal-container">
            <div className="verbal-content">
                <div className="verbal-header">
                    <h2 className="verbal-title">Verbal Ability & Aptitude Arena 📝</h2>
                    <p className="verbal-subtitle">Practice Synonyms, Grammar, Sentence Correction, and Reasoning with instant explanations.</p>
                    <div className="verbal-disclaimer">ℹ️ Scope Note: Focused on Placement Verbal & GATE General Aptitude (English).</div>
                </div>

                <div className="controls-bar">
                    <div className="level-group">
                        <span className="level-label">Level:</span>
                        {["All", "Easy", "Normal", "Challenge"].map(level => (
                            <button key={level} onClick={() => handleRestart(level)} className={`level-btn ${selectedDifficulty === level ? 'active' : ''}`}>
                                {level}
                            </button>
                        ))}
                    </div>
                    <label className="timer-label">
                        <input type="checkbox" checked={timedMode} onChange={() => { setTimedMode(!timedMode); setTimeLeft(45); }} />
                        ⏱️ Timed Mode (45s/Q)
                    </label>
                </div>

                {!quizFinished && currentQ ? (
                    <div className="quiz-card">
                        <div className="quiz-meta">
                            <span>Question {currentIndex + 1} of {filteredQuestions.length} • {currentQ.topic} ({currentQ.difficulty})</span>
                            {timedMode && <span className={timeLeft <= 10 ? 'timer-danger' : 'timer-warning'}>⏳ {timeLeft}s remaining</span>}
                        </div>

                        <h3 className="question-text">{currentQ.question}</h3>

                        <div className="options-list">
                            {currentQ.options.map((opt, idx) => (
                                <button key={idx} disabled={isSubmitted} onClick={() => setSelectedOption(idx)} className={getOptionClass(idx)}>
                                    <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                                </button>
                            ))}
                        </div>

                        {isSubmitted && (
                            <div className="explanation-box">
                                <strong className="explanation-title">{selectedOption === currentQ.correct ? "✅ Correct!" : "❌ Incorrect / Timed Out"} — Explanation:</strong>
                                <p className="explanation-text">{currentQ.explanation}</p>
                            </div>
                        )}

                        <div className="action-row">
                            <span className="score-display">Current Score: {score}</span>
                            {!isSubmitted ? (
                                <button onClick={handleCheckAnswer} disabled={selectedOption === null} className="action-btn check-ans-btn">Check Answer</button>
                            ) : (
                                <button onClick={handleNext} className="action-btn next-ans-btn">
                                    {currentIndex + 1 < filteredQuestions.length ? "Next Question ➡️" : "Finish Quiz 🏁"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="completion-screen">
                        <h3 style={{ color: '#123b73', fontSize: '26px', margin: '0 0 10px 0' }}>Session Complete! 🎉</h3>
                        <p style={{ fontSize: '18px', color: '#334155', marginBottom: '25px' }}>
                            You scored <strong>{score}</strong> out of <strong>{filteredQuestions.length}</strong> ({Math.round((score / filteredQuestions.length) * 100)}% accuracy).
                        </p>

                        {missedQuestions.length > 0 && (
                            <div className="weak-areas-box">
                                <h4 style={{ margin: '0 0 12px 0', color: '#b45309' }}>📌 Weak-Area Revision Queue ({missedQuestions.length} items):</h4>
                                {missedQuestions.map((mq, i) => (
                                    <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < missedQuestions.length - 1 ? '1px solid #fde68a' : 'none' }}>
                                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>Q: {mq.question}</p>
                                        <p style={{ margin: 0, color: '#166534', fontSize: '13px' }}><strong>Correct Answer:</strong> {mq.options[mq.correct]} — {mq.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button onClick={() => handleRestart(selectedDifficulty)} className="action-btn next-ans-btn">🔄 Restart Quiz</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerbalAbility;