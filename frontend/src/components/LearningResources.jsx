import React, { useState } from 'react';
import './LearningResources.css';

const RESOURCES_DATA = [
    {
        id: 1, title: "English Grammar Course For Beginners", channel: "Learn English with Rebecca",
        topic: "Grammar", level: "Beginner", url: "https://www.youtube.com/results?search_query=english+grammar+for+beginners"
    },
    {
        id: 2, title: "Master 50 Common Phrasal Verbs", channel: "English with Lucy",
        topic: "Vocabulary", level: "Intermediate", url: "https://www.youtube.com/results?search_query=english+with+lucy+phrasal+verbs"
    },
    {
        id: 3, title: "Software Engineering Mock Interview", channel: "Pramp / Exponent",
        topic: "Interviews", level: "Advanced", url: "https://www.youtube.com/results?search_query=software+engineering+mock+interview"
    },
    {
        id: 4, title: "Clear Pronunciation & Accent Training", channel: "Rachel's English",
        topic: "Pronunciation", level: "All Levels", url: "https://www.youtube.com/results?search_query=rachels+english+pronunciation"
    },
    {
        id: 5, title: "TCS NQT Verbal Ability Questions Solved", channel: "Online Study4U",
        topic: "Aptitude", level: "Intermediate", url: "https://www.youtube.com/results?search_query=tcs+nqt+verbal+ability"
    },
    {
        id: 6, title: "How to introduce yourself in a presentation", channel: "Oxford Online English",
        topic: "Presentations", level: "Beginner", url: "https://www.youtube.com/results?search_query=how+to+introduce+yourself+presentation"
    }
];

const CATEGORIES = ["All", "Grammar", "Vocabulary", "Pronunciation", "Interviews", "Presentations", "Aptitude"];

const LearningResources = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredResources = activeCategory === "All" 
        ? RESOURCES_DATA 
        : RESOURCES_DATA.filter(res => res.topic === activeCategory);

    return (
        <div className="resources-container">
            <div className="resources-content">
                <div className="resources-header">
                    <h2 className="resources-title">Curated Learning Resources 📺</h2>
                    <p className="resources-subtitle">Handpicked YouTube tutorials to help you master grammar, pronunciation, and placement aptitude.</p>
                    <div className="resources-disclaimer">
                        ℹ️ <strong>Note:</strong> These are curated external resources for self-study and are not officially endorsed by Vocal Canvas.
                    </div>
                </div>

                <div className="filter-bar">
                    {CATEGORIES.map(category => (
                        <button 
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="resources-grid">
                    {filteredResources.map(resource => (
                        <div className="resource-card" key={resource.id}>
                            <div>
                                <div className="card-badges">
                                    <span className="badge-topic">{resource.topic}</span>
                                    <span className="badge-level">Level: {resource.level}</span>
                                </div>
                                <h3>{resource.title}</h3>
                                <p className="resource-channel">👤 {resource.channel}</p>
                            </div>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                                ▶️ Watch on YouTube
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningResources;