import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/history/${userId}`);
                const data = await response.json();
                
                if (response.ok && data.success) {
                    setHistory(data.data);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
            setLoading(false);
        };

        fetchHistory();
    }, []);

    // Delete single history item (Section 4.13)
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this practice record?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/history/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setHistory(history.filter(item => item._id !== id));
            } else {
                alert("Could not delete item.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Server error while deleting.");
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading your progress... ⏳</div>;
    }

    return (
        <div style={{ padding: '40px 20px', minHeight: '80vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
                    <div>
                        <h2 style={{ color: '#123b73', fontSize: '32px', margin: '0 0 8px 0' }}>Your Progress Dashboard 📈</h2>
                        <p style={{ color: '#64748b', fontSize: '17px', margin: 0 }}>
                            Track your genuine practice sessions, review AI feedback, and pick your next activity.
                        </p>
                    </div>
                    <div style={{ backgroundColor: '#123b73', color: 'white', padding: '12px 22px', borderRadius: '12px', textAlign: 'center' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', display: 'block' }}>{history.length}</span>
                        <span style={{ fontSize: '13px', opacity: 0.9 }}>Completed Sessions</span>
                    </div>
                </div>

                {/* Suggested Next Activities */}
                <div style={{ backgroundColor: 'white', padding: '18px 22px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                        <strong style={{ color: '#1e293b', fontSize: '16px' }}>🎯 Recommended Next Step:</strong>
                        <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '14px' }}>
                            Combine speaking practice with placement verbal aptitude questions for balanced improvement.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/practice" style={{ padding: '9px 16px', backgroundColor: '#f59e0b', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            🎙️ Speaking Coach
                        </Link>
                        <Link to="/verbal-ability" style={{ padding: '9px 16px', backgroundColor: '#123b73', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            📝 Verbal Aptitude Quiz
                        </Link>
                    </div>
                </div>

                {history.length === 0 ? (
                    <div style={{ padding: '45px', textAlign: 'center', backgroundColor: 'white', borderRadius: '14px', border: '2px dashed #cbd5e1' }}>
                        <h3 style={{ color: '#64748b', marginTop: 0 }}>No saved practice history yet.</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Complete a speaking session in the Practice Arena to see your real progress here.</p>
                        <Link to="/practice" style={{ padding: '12px 25px', backgroundColor: '#123b73', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                            Start First Session
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {history.map((item) => (
                            <div key={item._id} style={{ padding: '25px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', borderLeft: '5px solid #f59e0b' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold' }}>
                                        📅 {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                                    </span>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <strong style={{ color: '#123b73' }}>You said: </strong>
                                    <span style={{ color: '#334155', fontStyle: 'italic' }}>"{item.transcript}"</span>
                                </div>
                                <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '8px', border: '1px solid #bfdbfe', color: '#1e40af', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                    <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '6px' }}>AI Feedback:</strong>
                                    {item.feedback}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;