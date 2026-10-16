import React, { useState, useEffect } from 'react';

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

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Loading your progress... ⏳</div>;
    }

    return (
        <div style={{ padding: '40px 20px', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ color: '#123b73', fontSize: '32px', marginBottom: '10px' }}>Your Progress Dashboard 📈</h2>
                <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px' }}>
                    Track your English speaking journey and review past feedback.
                </p>

                {history.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                        <h3 style={{ color: '#94a3b8' }}>No practice history found yet.</h3>
                        <p style={{ color: '#64748b' }}>Head over to the Practice Arena and start speaking!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {history.map((item, index) => (
                            <div key={index} style={{ padding: '25px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '5px solid #f59e0b' }}>
                                <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>
                                    📅 {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <strong style={{ color: '#123b73' }}>You said: </strong>
                                    <span style={{ color: '#334155', fontStyle: 'italic' }}>"{item.transcript}"</span>
                                </div>
                                <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '8px', border: '1px solid #bfdbfe', color: '#1e40af', whiteSpace: 'pre-line' }}>
                                    <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '5px' }}>AI Feedback:</strong>
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