import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import Dashboard from './components/Dashboard';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/incidents.yaml');
        if (!response.ok) {
          throw new Error('Failed to fetch incident data');
        }
        const text = await response.text();
        const data = yaml.load(text);
        setIncidents(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Dashboard incidents={incidents} loading={loading} error={error} />
    </div>
  );
}

export default App;
