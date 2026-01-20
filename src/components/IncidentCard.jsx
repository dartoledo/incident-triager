import React from 'react';

const IncidentCard = ({ incident }) => {
  return (
    <div className="incident-card">
      <div className="card-header">
        <h3 className="incident-title">{incident.title}</h3>
        {/* <span className="incident-id">#{incident.id}</span> */}
      </div>

      <div className="card-body">
        <p className="symptom-label">Symptom Description:</p>
        <p className="incident-description">{incident.symptom_description}</p>
      </div>

      {incident.monitoring_signals && (
        <div className="card-section">
          <h4 className="section-title">Monitoring Signals</h4>
          <ul className="signal-list">
            {incident.monitoring_signals.map((signal, index) => (
              <li key={index} className="signal-item">
                <div className="signal-main">
                  {signal.icon && <span className="signal-icon">{signal.icon}</span>}
                  <span className="signal-label">{signal.label}:</span>
                  <span className="signal-value">{signal.value}</span>
                </div>
                {signal.description && <span className="signal-desc">({signal.description})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {incident.pager_duty_alerts && (
        <div className="card-section">
          <h4 className="section-title">Possible PagerDuty Alerts</h4>
          <ul className="alert-list">
            {incident.pager_duty_alerts.map((alert, index) => (
              <li key={index} className="alert-item">
                <span className="icon">🚨</span> {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {incident.decision_action && (
        <div className="card-section">
          <h4 className="section-title">Decision / Action</h4>
          <ul className="decision-list">
            {incident.decision_action.map((item, index) => (
              <li key={index} className="decision-item">
                <span className="decision-condition">{item.condition}:</span>
                <span className="decision-action"> {item.action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {incident.runbooks && (
        <div className="card-section">
          <h4 className="section-title">Runbook</h4>
          <div className="runbook-list">
            {incident.runbooks.map((rb, index) => (
              <a key={index} href={rb.url} className="runbook-link" target="_blank" rel="noopener noreferrer">
                {rb.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="card-footer">
        <span className="team-label">Team/PIC:</span>
        <span className="team-value">{incident.team}</span>
      </div>

      <style>{`
        .incident-card {
          background: var(--bg-card);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          height: 100%; /* Make cards fill height */
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .incident-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          background: var(--bg-card-hover);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .incident-title {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-accent); /* Accent color for titles */
        }

        .incident-id {
           font-size: 0.8rem;
           color: var(--text-secondary);
           background: rgba(255,255,255,0.05);
           padding: 0.2rem 0.4rem;
           border-radius: 4px;
        }

        .card-body {
          margin-bottom: 1.5rem;
        }

        .symptom-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: var(--text-secondary);
            margin-bottom: 0.25rem;
        }

        .incident-description {
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.5;
          font-style: italic; /* Style for symptom description */
        }

        .card-section {
          margin-bottom: 1.25rem;
          flex-grow: 1; /* Allow sections to expand */
        }

        .section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.25rem;
        }

        .signal-list, .alert-list, .decision-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .signal-item {
            font-size: 0.9rem;
        }
        
        .signal-main {
             display: flex;
             align-items: center;
             gap: 0.4rem;
        }

        .signal-label {
             color: var(--text-primary);
        }

        .signal-value {
             font-weight: 600;
             color: var(--text-accent);
        }
        
        .signal-trend-drop { color: #f87171; }
        .signal-trend-spike { color: #ef4444; }

        .signal-desc {
            display: block;
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-left: 1.2rem;
        }

        .alert-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #fca5a5; /* Light red for alerts */
        }

        .decision-item {
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }

        .decision-condition {
            color: var(--text-secondary);
            margin-right: 0.3rem;
        }
        
        .decision-action {
            color: var(--text-primary);
            font-weight: 500;
        }

        .runbook-link {
          display: inline-block;
          font-size: 0.8rem;
          color: var(--text-accent);
          text-decoration: none;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          border: 1px solid rgba(56, 189, 248, 0.2);
          transition: all 0.2s ease;
        }

        .runbook-link:hover {
          background: rgba(56, 189, 248, 0.2);
        }

        .card-footer {
          margin-top: auto; /* Push to bottom */
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .team-label {
          color: var(--text-secondary);
        }

        .team-value {
          color: var(--text-primary);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default IncidentCard;
