import React, { useState, useRef, useEffect } from 'react';

const SUGGESTED_QUESTIONS = [
  "Explain the election process step by step",
  "What is voter registration and how do I register?",
  "What happens on voting day?",
  "Explain the election timeline from announcement to results",
  "How are votes counted and verified?",
  "What should first-time voters know?"
];

const TIMELINE_STEPS = [
  { id: 1, title: "Election Announcement", desc: "Official dates and guidelines are published." },
  { id: 2, title: "Voter Registration", desc: "Citizens enroll or update details on the electoral roll." },
  { id: 3, title: "Candidate Nomination", desc: "Candidates file papers to run for office." },
  { id: 4, title: "Campaign Period", desc: "Candidates present their platforms to the public." },
  { id: 5, title: "Voting Day", desc: "Registered voters cast their ballots." },
  { id: 6, title: "Vote Counting", desc: "Ballots are securely counted and verified." },
  { id: 7, title: "Result Declaration", desc: "Official winners are announced." }
];

const VOTER_JOURNEY = [
  { id: 1, icon: "👤", title: "Check Eligibility", desc: "Verify age and citizenship requirements" },
  { id: 2, icon: "📝", title: "Register to Vote", desc: "Complete registration before the deadline" },
  { id: 3, icon: "📍", title: "Know Your Polling Station", desc: "Find your assigned voting location" },
  { id: 4, icon: "🪪", title: "Carry Valid ID", desc: "Bring accepted government-issued identification" },
  { id: 5, icon: "🗳️", title: "Cast Your Vote", desc: "Follow booth instructions carefully" },
  { id: 6, icon: "✅", title: "Follow Official Results", desc: "Check only authorized sources for results" }
];

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (textToSubmit = message) => {
    if (!textToSubmit.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSubmit })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setResponse(data.reply);
      setMessage(''); // Clear input on success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSuggestedClick = (question) => {
    setMessage(question);
    handleSubmit(question);
  };

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [response]);

  return (
    <div className="app-container">
      {/* [1] HEADER / HERO */}
      <header className="hero-section">
        <h1 className="hero-title">CivicPath AI</h1>
        <h2 className="hero-tagline">Understand elections step by step</h2>
        <p className="hero-description">
          A neutral, non-partisan AI assistant to help you navigate the election process, voter registration, and voting timelines in simple, clear language.
        </p>
        <span className="disclaimer-badge">Neutral · Non-partisan · Educational</span>
      </header>

      <main className="main-content">
        {/* [2] AI CHAT PANEL */}
        <section className="chat-panel card">
          <form onSubmit={onFormSubmit} className="chat-form">
            <div className="input-group">
              <label htmlFor="chat-input" className="sr-only">Ask about elections...</label>
              <textarea
                id="chat-input"
                className="chat-textarea"
                placeholder="Ask about elections..."
                maxLength={500}
                rows={3}
                value={message}
                onChange={handleMessageChange}
                disabled={isLoading}
              />
              <div className="char-counter">{message.length} / 500</div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isLoading || message.trim().length === 0}
              aria-busy={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Ask CivicPath AI'}
            </button>
          </form>

          {error && <div className="error-message" role="alert">{error}</div>}

          <div 
            className="response-area" 
            role="status" 
            aria-live="polite"
            ref={responseRef}
          >
            {isLoading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>CivicPath AI is thinking...</span>
              </div>
            )}
            
            {response && !isLoading && (
              <div className="response-card">
                <div className="response-content">
                  {response.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}<br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* [3] SUGGESTED QUESTIONS */}
        <section className="suggested-section">
          <h3 className="section-title">Suggested Questions</h3>
          <div className="suggested-grid">
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                className="suggested-btn"
                onClick={() => handleSuggestedClick(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </section>

        {/* [4] ELECTION TIMELINE */}
        <section className="timeline-section card">
          <h3 className="section-title">Election Timeline</h3>
          <div className="timeline-container">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.id} className="timeline-step">
                <div className="step-number">{step.id}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* [5] VOTER JOURNEY CARDS */}
        <section className="journey-section">
          <h3 className="section-title">Voter Journey</h3>
          <div className="journey-grid">
            {VOTER_JOURNEY.map((card) => (
              <div key={card.id} className="journey-card card">
                <div className="journey-icon" aria-hidden="true">{card.icon}</div>
                <h4 className="journey-title">{card.title}</h4>
                <p className="journey-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* [6] DISCLAIMER FOOTER */}
      <footer className="app-footer">
        <div className="disclaimer-box">
          <p>
            This assistant is for educational purposes only. It provides neutral civic information and does not support any political party or candidate. Always verify specific details from your official election authority.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
