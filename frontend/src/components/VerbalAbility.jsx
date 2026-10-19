import React, { useState, useEffect } from 'react';

const QUESTION_BANK = [
    {
        id: 1,
        topic: "Synonyms & Vocabulary",
        difficulty: "Easy",
        question: "Choose the word most similar in meaning (Synonym) to: 'PRAGMATIC'",
        options: ["Idealistic", "Practical", "Emotional", "Uncertain"],
        correct: 1,
        explanation: "'Pragmatic' means dealing with things sensibly and realistically (Practical), rather than following theoretical ideas."
    },
    {
        id: 2,
        topic: "Grammar & Fill-in-the-Blanks",
        difficulty: "Easy",
        question: "Neither the project lead nor the team members _______ present at yesterday's review meeting.",
        options: ["was", "were", "is", "has been"],
        correct: 1,
        explanation: "Rule: With 'Neither...nor', the verb agrees with the closer subject ('team members' is plural, and 'yesterday' requires past tense 'were')."
    },
    {
        id: 3,
        topic: "Sentence Correction",
        difficulty: "Normal",
        question: "Identify the grammatically correct sentence for a formal interview:",
        options: [
            "I am having three years of experience in coding.",
            "I have three years of experience in software development.",
            "Myself Ashu and I am good in coding.",
            "I discussed about the database issue with my team."
        ],
        correct: 1,
        explanation: "'Have' (state of possession) is not used in the continuous form ('am having'). Also, 'discuss' never takes 'about', and 'Myself' cannot be used as a subject."
    },
    {
        id: 4,
        topic: "Antonyms (GATE Aptitude)",
        difficulty: "Normal",
        question: "Select the word opposite in meaning (Antonym) to: 'EPHEMERAL'",
        options: ["Short-lived", "Permanent", "Fragile", "Transparent"],
        correct: 1,
        explanation: "'Ephemeral' means lasting for a very short time. Therefore, its exact opposite is 'Permanent'."
    },
    {
        id: 5,
        topic: "Critical Verbal Reasoning",
        difficulty: "Challenge",
        question: "Despite the _______ nature of the legacy codebase, the intern managed to _______ the critical bug before the deployment deadline.",
        options: [
            "convoluted ... rectify",
            "simple ... aggravate",
            "transparent ... obscure",
            "modern ... ignore"
        ],
        correct: 0,
        explanation: "'Despite' signals a contrast. A 'convoluted' (complex/twisted) codebase contrasts with successfully managing to 'rectify' (fix/correct) the bug."
    },
    {
        id: 6,
        topic: "Sentence Ordering",
        difficulty: "Challenge",
        question: "Arrange parts P, Q, R, S to form a coherent sentence:\n(P) before deploying to production\n(Q) software engineers must thoroughly validate\n(R) to prevent unexpected runtime crashes\n(S) all user inputs on the server",
        options: ["Q - S - P - R", "P - Q - R - S", "S - Q - R - P", "Q - P - S - R"],
        correct: 0,
        explanation: "'Q-S-P-R' reads naturally: 'Software engineers must thoroughly validate (Q) all user inputs on the server (S) before deploying to production (P) to prevent unexpected runtime crashes (R).'"
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

    const filteredQuestions = selectedDifficulty === "All" 
        ? QUESTION_BANK 
        : QUESTION_BANK.filter(q => q.difficulty === selectedDifficulty);

    const currentQ = filteredQuestions[currentIndex];

    // Timer effect for Timed Mode
    useEffect(() => {
        if (!timedMode || isSubmitted || quizFinished) return;

        if (timeLeft === 0) {
            handleAutoSubmitTimeout();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timedMode, timeLeft, isSubmitted, quizFinished]);

    const handleAutoSubmitTimeout = () => {
        setIsSubmitted(true);
        if (currentQ && !missedQuestions.some(q => q.id === currentQ.id)) {
            setMissedQuestions(prev => [...prev, currentQ]);
        }
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);

        if (selectedOption === currentQ.correct) {
            setScore(prev => prev + 1);
        } else {
            if (!missedQuestions.some(q => q.id === currentQ.id)) {
                setMissedQuestions(prev => [...prev, currentQ]);
            }
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

    return (
        <div style={{ padding: '35px 20px', minHeight: '85vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Header & GATE Disclaimer (Section 4.9) */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#123b73', fontSize: '30px', marginBottom: '8px' }}>
                        Verbal Ability & Aptitude Arena 📝
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 12px 0' }}>
                        Practice Synonyms, Grammar, Sentence Correction, and Reasoning with instant explanations.
                    </p>
                    <div style={{ display: 'inline-block', backgroundColor: '#fef3c7', color: '#92400e', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #fde68a' }}>
                        ℹ️ Scope Note: Focused on Placement Verbal & GATE General Aptitude (English), not technical CSE subjects.
                    </div>
                </div>

                {/* Controls Bar: Difficulty & Timed Mode */}
                <div style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 'bold', color: '#334155', fontSize: '14px' }}>Level:</span>
                        {["All", "Easy", "Normal", "Challenge"].map(level => (
                            <button
                                key={level}
                                onClick={() => handleRestart(level)}
                                style={{
                                    padding: '6px 13px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    backgroundColor: selectedDifficulty === level ? '#123b73' : '#f1f5f9',
                                    color: selectedDifficulty === level ? 'white' : '#475569'
                                }}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: '#123b73' }}>
                            <input 
                                type="checkbox" 
                                checked={timedMode} 
                                onChange={() => { setTimedMode(!timedMode); setTimeLeft(45); }} 
                            />
                            ⏱️ Timed Mode (45s/Q)
                        </label>
                    </div>
                </div>

                {/* Quiz Card or Completion Screen */}
                {!quizFinished && currentQ ? (
                    <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        
                        {/* Top Meta Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontSize: '14px', color: '#64748b', fontWeight: 'bold' }}>
                            <span>Question {currentIndex + 1} of {filteredQuestions.length} • {currentQ.topic} ({currentQ.difficulty})</span>
                            {timedMode && (
                                <span style={{ color: timeLeft <= 10 ? '#dc2626' : '#f59e0b', fontSize: '15px' }}>
                                    ⏳ {timeLeft}s remaining
                                </span>
                            )}
                        </div>

                        {/* Question Text */}
                        <h3 style={{ color: '#1e293b', fontSize: '19px', lineHeight: '1.5', whiteSpace: 'pre-line', marginBottom: '22px' }}>
                            {currentQ.question}
                        </h3>

                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
                            {currentQ.options.map((opt, idx) => {
                                let bg = '#f8fafc';
                                let border = '1px solid #cbd5e1';
                                let textColor = '#1e293b';

                                if (isSubmitted) {
                                    if (idx === currentQ.correct) {
                                        bg = '#dcfce7';
                                        border = '2px solid #16a34a';
                                        textColor = '#166534';
                                    } else if (idx === selectedOption) {
                                        bg = '#fee2e2';
                                        border = '2px solid #dc2626';
                                        textColor = '#991b1b';
                                    }
                                } else if (selectedOption === idx) {
                                    bg = '#eff6ff';
                                    border = '2px solid #123b73';
                                }

                                return (
                                    <button
                                        key={idx}
                                        disabled={isSubmitted}
                                        onClick={() => setSelectedOption(idx)}
                                        style={{
                                            padding: '14px 18px',
                                            textAlign: 'left',
                                            borderRadius: '10px',
                                            backgroundColor: bg,
                                            border: border,
                                            color: textColor,
                                            fontSize: '16px',
                                            fontWeight: selectedOption === idx ? 'bold' : 'normal',
                                            cursor: isSubmitted ? 'default' : 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation Box */}
                        {isSubmitted && (
                            <div style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid #123b73', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '5px' }}>
                                    {selectedOption === currentQ.correct ? "✅ Correct!" : "❌ Incorrect / Timed Out"} — Explanation:
                                </strong>
                                <p style={{ margin: 0, color: '#1e40af', fontSize: '15px', lineHeight: '1.5' }}>
                                    {currentQ.explanation}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', color: '#475569' }}>Current Score: {score}</span>
                            {!isSubmitted ? (
                                <button
                                    onClick={handleCheckAnswer}
                                    disabled={selectedOption === null}
                                    style={{ padding: '12px 28px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: selectedOption === null ? 'not-allowed' : 'pointer', opacity: selectedOption === null ? 0.6 : 1 }}
                                >
                                    Check Answer
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    style={{ padding: '12px 28px', backgroundColor: '#123b73', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                                >
                                    {currentIndex + 1 < filteredQuestions.length ? "Next Question ➡️" : "Finish Quiz 🏁"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Completion & Weak-Area Revision Summary (Section 5.F) */
                    <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ color: '#123b73', fontSize: '26px', margin: '0 0 10px 0' }}>Session Complete! 🎉</h3>
                        <p style={{ fontSize: '18px', color: '#334155', marginBottom: '25px' }}>
                            You scored <strong>{score}</strong> out of <strong>{filteredQuestions.length}</strong> ({Math.round((score / filteredQuestions.length) * 100)}% accuracy).
                        </p>

                        {missedQuestions.length > 0 && (
                            <div style={{ textAlign: 'left', backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
                                <h4 style={{ margin: '0 0 12px 0', color: '#b45309' }}>📌 Weak-Area Revision Queue ({missedQuestions.length} items to review):</h4>
                                {missedQuestions.map((mq, i) => (
                                    <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < missedQuestions.length - 1 ? '1px solid #fde68a' : 'none' }}>
                                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>Q: {mq.question}</p>
                                        <p style={{ margin: 0, color: '#166534', fontSize: '13px' }}><strong>Correct Answer:</strong> {mq.options[mq.correct]} — {mq.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleRestart(selectedDifficulty)}
                            style={{ padding: '13px 32px', backgroundColor: '#123b73', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                        >
                            🔄 Restart Quiz
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VerbalAbility;