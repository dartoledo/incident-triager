import React from 'react';

const IncidentCard = ({ incident }) => {
  return (
    <div className="incident-card">
      <div className="card-header">
        <h3 className="incident-title">{incident.title}</h3>
        <span className="incident-id">#{incident.id}</span>
      </div>

      <div className="card-body">
        <p className="incident-description">{incident.description}</p>
      </div>

      <div className="card-section">
        <h4 className="section-title">PagerDuty Alerts</h4>
        <ul className="alert-list">
          {incident.pager_duty_alerts && incident.pager_duty_alerts.map((alert, index) => (
            <li key={index} className="alert-item">
              <span className="icon">🚨</span> {alert}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-section">
        <h4 className="section-title">Mitigation Steps</h4>
        <ul className="step-list">
          {incident.mitigation_steps && incident.mitigation_steps.map((step, index) => (
            <li key={index} className="step-item">
              <span className="icon">✅</span>
              {typeof step === 'string' ? step : (
                <span>
                  {step.text}
                  {step.runbook_url && (
                    <a href={step.runbook_url} target="_blank" rel="noopener noreferrer" className="runbook-link">
                      Runbook ↗
                    </a>
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-footer">
        <span className="team-label">Teams:</span>
        <span className="team-value">{incident.teams}</span>
      </div>

      <style>{`
        .incident-card {
          background: var(--bg-card);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
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
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 1rem;
        }

        .incident-title {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-primary);
        }

        .incident-id {
          font-size: 0.875rem;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          height: fit-content;
        }

        .card-body {
          margin-bottom: 1.5rem;
        }

        .incident-description {
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        .card-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .alert-item, .step-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .alert-item .icon {
          font-size: 1.1em;
        }
        
        .step-item .icon {
           font-size: 1.1em;
        }

        .card-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.875rem;
        }

        .team-label {
          color: var(--text-secondary);
        }

        .team-value {
          color: var(--text-accent);
          font-weight: 500;
        }

        .runbook-link {
          display: inline-block;
          margin-left: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-accent);
          text-decoration: none;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          border: 1px solid rgba(56, 189, 248, 0.2);
          transition: all 0.2s ease;
        }

        .runbook-link:hover {
          background: rgba(56, 189, 248, 0.2);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default IncidentCard;
