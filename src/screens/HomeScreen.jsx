import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="page-container slide-up" style={{ flex: 1 }}>
      <div style={{
        margin: 'var(--space-2xl) 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p className="title-lg" style={{ color: 'var(--text-muted)' }}>
          Welcome to
        </p>
        <h1 className="display-lg text-gradient" style={{
          margin: 'var(--space-sm) 0 var(--space-md)'
        }}>
          BharatTour
        </h1>
        <p className="body-lg" style={{
          color: 'var(--text-muted)',
          maxWidth: '600px'
        }}>
          Discover the heritage, culture, and analytics of India's tourism with our state-of-the-art predictive platform.
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-lg)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div 
          onClick={() => navigate('/dashboard')}
          className="glass-card"
          style={{
            padding: 'var(--space-xl)',
            cursor: 'pointer',
            borderTop: '4px solid var(--primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
            color: 'var(--primary)',
            fontSize: '24px'
          }}>
            📊
          </div>
          <h2 className="headline-md" style={{ marginBottom: 'var(--space-sm)' }}>
            Analytics Dashboard
          </h2>
          <p className="body-md" style={{ color: 'var(--text-muted)' }}>
            View ML-powered tourism forecasts and regional trends in real-time.
          </p>
        </div>
        
        <div 
          onClick={() => navigate('/explore')}
          className="glass-card"
          style={{
            padding: 'var(--space-xl)',
            cursor: 'pointer',
            borderTop: '4px solid var(--secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(14, 165, 233, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
            color: 'var(--secondary)',
            fontSize: '24px'
          }}>
            🌍
          </div>
          <h2 className="headline-md" style={{ marginBottom: 'var(--space-sm)' }}>
            Explore Destinations
          </h2>
          <p className="body-md" style={{ color: 'var(--text-muted)' }}>
            Browse popular tourist spots, uncover hidden gems, and view specific forecasts.
          </p>
        </div>
      </div>
    </div>
  );
}
