import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

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
                const response = await fetch(`[https://vocalcanvas.onrender.com](https://vocalcanvas.onrender.com)/api/history/${userId}`);
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this practice record?")) return;

        try {
            const response = await fetch(`[https://vocalcanvas.onrender.com](https://vocalcanvas.onrender.com)/api/history/${id}`, { method: 'DELETE' });
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

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading your progress... ⏳</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h2 className="dashboard-title">Your Progress Dashboard 📈</h2>
                        <p className="dashboard-subtitle">Track your genuine practice sessions, review AI feedback, and pick your next activity.</p>
                    </div>
                    <div className="stats-box">
                        <span className="stats-number">{history.length}</span>
                        <span className="stats-label">Completed Sessions</span>
                    </div>
                </div>

                <div className="suggested-box">
                    <div>
                        <strong className="suggested-title">🎯 Recommended Next Step:</strong>
                        <p className="suggested-text">Combine speaking practice with placement verbal aptitude questions for balanced improvement.</p>
                    </div>
                    <div className="suggested-actions">
                        <Link to="/practice" className="btn-secondary">🎙️ Speaking Coach</Link>
                        <Link to="/verbal-ability" className="btn-primary">📝 Verbal Aptitude Quiz</Link>
                    </div>
                </div>

                {history.length === 0 ? (
                    <div className="empty-state">
                        <h3 style={{ color: '#64748b', marginTop: 0 }}>No saved practice history yet.</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Complete a speaking session in the Practice Arena to see your real progress here.</p>
                        <Link to="/practice" className="btn-primary" style={{ padding: '12px 25px' }}>Start First Session</Link>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map((item) => (
                            <div key={item._id} className="history-card">
                                <div className="history-card-header">
                                    <span className="history-date">📅 {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}</span>
                                    <button onClick={() => handleDelete(item._id)} className="delete-btn">🗑️ Delete</button>
                                </div>
                                <div className="history-transcript">
                                    <strong style={{ color: '#123b73' }}>You said: </strong>
                                    <span style={{ color: '#334155', fontStyle: 'italic' }}>"{item.transcript}"</span>
                                </div>
                                <div className="history-feedback">
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