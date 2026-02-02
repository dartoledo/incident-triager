import React from 'react';
import IncidentCard from './IncidentCard';
import MermaidDiagram from './MermaidDiagram';

const PRIMARY_SYSTEM_DIAGRAM = `
graph TD
  User((User Traffic)) --> Card1A[1A: Public Web Login]
  Card1A --> Card1B[1B: API Gateway]
  Card1B --> Routing{Routing}
  Routing -->|Cloud Path| Card2A[2A: GCP Service]
  Routing -->|Legacy Path| Card2B[2B: On-Prem Service]
  Card2A & Card2B --> Card3[3: Cassandra Cluster]
  
  style Card1A fill:#333,stroke:#fff,stroke-width:2px,color:#fff
  style Card1B fill:#333,stroke:#fff,stroke-width:2px,color:#fff
  style Card2A fill:#333,stroke:#fff,stroke-width:2px,color:#fff
  style Card2B fill:#333,stroke:#fff,stroke-width:2px,color:#fff
  style Card3 fill:#333,stroke:#fff,stroke-width:2px,color:#fff
`;

const Dashboard = ({ incidents, loading, error }) => {
  const [selectedIncident, setSelectedIncident] = React.useState(null);

  const activeChart = selectedIncident ? selectedIncident.mermaid_chart : PRIMARY_SYSTEM_DIAGRAM;
  const activeTitle = selectedIncident ? `Triage Flow: ${selectedIncident.title}` : "System Overview";
  const activeSubtitle = selectedIncident ? "Decision Logic & Root Cause Analysis" : "Architecture & Dependency Map";

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
            border-top-color: var(--text-primary);
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
            color: var(--text-primary);
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Critical Incident Triage:  Login and Auth</h1>
        <p>High-level triage dashboard tracking Service Availability, Latency, Traffic, Errors. Used to determine the blast radius of outages (Global vs. Regional) and track recovery progress.
        </p>
      </header>

      <div className="incidents-grid">
        {incidents.sort((a, b) => (a.row || 99) - (b.row || 99)).map(incident => (
          <div
            key={incident.id}
            className={`incident-wrapper col-span-${incident.col_span || 1}`}
          >
            <IncidentCard
              incident={incident}
              isSelected={selectedIncident?.id === incident.id}
              onSelect={() => setSelectedIncident(selectedIncident?.id === incident.id ? null : incident)}
            />
          </div>
        ))}

        {incidents.length === 0 && (
          <div className="empty-state">
            <p>No major incidents reported. All systems operational.</p>
          </div>
        )}
      </div>

      <section className="diagram-section">
        <div className="section-header">
          <h2>{activeTitle}</h2>
          <span className="diagram-subtitle">{activeSubtitle}</span>
        </div>
        <MermaidDiagram chart={activeChart} />
      </section>

      <style>{`
        .dashboard-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .incidents-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr; /* Mobile first */
          max-width: 1000px;
          margin: 0 auto;
          margin-bottom: 4rem;
        }

        @media (min-width: 768px) {
            .incidents-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .col-span-2 {
                grid-column: span 2;
            }
        }

        .diagram-section {
          max-width: 1000px;
          margin: 0 auto 4rem auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.4s ease-out;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .diagram-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
