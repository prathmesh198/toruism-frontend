import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('https://toruism-frontend-eo2n.vercel.app/api/login/', {
        username,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.username) {
          localStorage.setItem('username', response.data.username);
        }
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="center-container slide-up">
      <div className="glass-panel" style={{
        padding: 'var(--space-2xl)',
        width: '100%',
        maxWidth: '450px',
      }}>
        <h1 className="display-sm text-gradient" style={{
          marginBottom: 'var(--space-sm)',
          textAlign: 'center'
        }}>
          BharatTour
        </h1>
        <p className="body-lg" style={{
          color: 'var(--text-muted)',
          marginBottom: 'var(--space-xl)',
          textAlign: 'center'
        }}>
          Sign in to your account
        </p>
        
        {error && (
          <p className="body-md" style={{ color: 'var(--error)', marginBottom: 'var(--space-md)', textAlign: 'center' }}>
            {error}
          </p>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field"
            required
          />
          
          <button 
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: 'var(--space-md)' }}
          >
            Sign In
          </button>
        </form>
        
        <p className="body-md" style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
