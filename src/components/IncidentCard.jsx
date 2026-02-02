import React, { useState } from 'react';

const IncidentCard = ({ incident, isSelected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onSelect) onSelect();
  };

  return (
    <div className={`incident-card ${isOpen ? 'expanded' : ''} ${isSelected ? 'selected' : ''}`}>
      <div className="card-header" onClick={handleClick} role="button" tabIndex={0}>
        <div className="title-wrapper">
          <span className={`chevron ${isOpen ? 'open' : ''}`}>▶</span>
          <span className="incident-id">{incident.id}</span>
          <h3 className="incident-title">{incident.title}</h3>
        </div>
      </div>

      {isOpen && (
        <div className="card-content-wrapper">
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
        </div>
      )}

      <style>{`
        .incident-card {
          background: var(--bg-card);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          /* height: 100%; Removed to allow auto height */
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .incident-card:hover {
          box-shadow: var(--shadow-lg);
          background: var(--bg-card-hover);
        }

        .incident-card.selected {
            border-color: rgba(255, 255, 255, 0.4);
            background: var(--bg-card-hover);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0; /* Changed for collapsed state spacing */
          padding-bottom: 0;
          border-bottom: 1px solid transparent; /* Hidden by default */
          cursor: pointer;
          user-select: none;
          transition: border-color 0.2s ease, padding-bottom 0.2s ease, margin-bottom 0.2s ease;
        }

        .incident-card.expanded .card-header {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.15);
        }
        
        .title-wrapper {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .chevron {
            font-size: 0.8rem;
            color: var(--text-secondary);
            transition: transform 0.3s ease;
            display: inline-block;
        }

        .chevron.open {
            transform: rotate(90deg);
        }

        .incident-title {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-primary);
          font-weight: 700;
        }

        .card-content-wrapper {
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .incident-id {
           font-size: 1rem;
           font-weight: 800;
           color: #000;
           background: #fff;
           padding: 0.25rem 0.5rem;
           border-radius: 6px;
           box-shadow: 0 0 10px rgba(255,255,255,0.2);
           min-width: 2.5em; /* Ensure consistent width */
           text-align: center;
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 0.25rem;
        }

        .signal-list, .alert-list, .decision-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            list-style: none; /* Ensure no default bullets */
            padding-left: 0;
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
             color: var(--text-primary);
        }
        
        .signal-trend-drop { color: var(--text-secondary); }
        .signal-trend-spike { color: var(--text-primary); font-weight: 700; }

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
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05); /* High contrast dark bg */
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
          color: var(--text-primary);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }

        .runbook-link:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .card-footer {
          margin-top: auto; /* Push to bottom */
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.15);
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
