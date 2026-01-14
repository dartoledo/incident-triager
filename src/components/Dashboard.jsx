import React from 'react';
import IncidentCard from './IncidentCard';

const Dashboard = ({ incidents, loading, error }) => {
    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading incidents...</p>
                <style>{`
          .dashboard-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            color: var(--text-secondary);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top-color: var(--text-accent);
            animation: spin 1s ease-in-out infinite;
            margin-bottom: 1rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <p>⚠️ {error}</p>
                <style>{`
          .dashboard-error {
            text-align: center;
            color: #ef4444;
            padding: 2rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(239, 68, 68, 0.2);
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Active Major Incidents</h1>
                <p>Real-time triage and mitigation tracking</p>
            </header>

            <div className="incidents-grid">
                {incidents.map(incident => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}

                {incidents.length === 0 && (
                    <div className="empty-state">
                        <p>No major incidents reported. All systems operational.</p>
                    </div>
                )}
            </div>

            <style>{`
        .dashboard-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .incidents-grid {
          display: grid;
          gap: 1.5rem;
          /* Responsive grid */
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
