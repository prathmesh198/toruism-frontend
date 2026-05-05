import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ExploreScreen() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, [searchQuery]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`https://tourism-backend-2-irj7.onrender.com/api/destinations/?search=${searchQuery}`);
      setDestinations(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading && destinations.length === 0) {
    return (
      <div className="center-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container slide-up" style={{ flex: 1 }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        marginBottom: 'var(--space-xl)'
      }}>
        <input 
          type="text" 
          placeholder="Search destinations by name or location..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
          style={{
            padding: 'var(--space-md) var(--space-lg)',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
      </div>

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'var(--space-lg)'
      }}>
        {destinations.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/destination/${item.id}`)}
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
          >
            {item.image_url ? (
              <div style={{ overflow: 'hidden', height: '220px' }}>
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ) : (
              <div style={{
                width: '100%',
                height: '220px',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                No Image
              </div>
            )}
            <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 className="title-lg" style={{
                color: 'var(--text-main)',
                marginBottom: '4px'
              }}>
                {item.name}
              </h2>
              <p className="label-bold" style={{
                color: 'var(--primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                📍 {item.location}
              </p>
              <p className="body-md" style={{
                color: 'var(--text-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
