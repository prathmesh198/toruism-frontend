import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardScreen() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      const response = await axios.get('https://tourism-backend-2-irj7.onrender.com/api/forecast/');
      setForecast(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load forecast data. Ensure backend is running.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="center-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center-container">
        <p className="body-lg" style={{ color: 'var(--error)', textAlign: 'center' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="page-container slide-up" style={{ flex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="display-sm text-gradient" style={{
          marginBottom: 'var(--space-xl)',
          textAlign: 'center'
        }}>
          Analytics Dashboard
        </h2>
        
        <div className="glass-panel" style={{
          padding: 'var(--space-xl)',
          marginBottom: 'var(--space-xl)',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.2)'
        }}>
          <p className="title-lg" style={{
            color: 'var(--primary)',
            marginBottom: 'var(--space-sm)'
          }}>
            Global Forecasted Tourists ({forecast.month}/{forecast.year})
          </p>
          <p className="display-lg" style={{
            color: 'var(--text-main)'
          }}>
            {forecast.forecasted_tourists.toLocaleString()}
          </p>
        </div>
        
        <h3 className="headline-lg" style={{
          color: 'var(--text-main)',
          marginBottom: 'var(--space-lg)'
        }}>
          Regional Breakdown
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
          {Object.entries(forecast.regional_breakdown).map(([region, value]) => (
            <div key={region} className="glass-card" style={{
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderLeft: '4px solid var(--secondary)'
            }}>
              <p className="title-lg" style={{
                color: 'var(--text-main)',
                marginBottom: 'var(--space-xs)'
              }}>
                {region}
              </p>
              <p className="headline-md" style={{
                color: 'var(--primary)'
              }}>
                {value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
