import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 1. Register the user
      await axios.post(' https://tourist-backend-j0qo.onrender.com/api/register/', {
        username,
        password
      });
      
      // 2. Automatically log them in after registration
      const loginResponse = await axios.post(' https://tourist-backend-j0qo.onrender.com/api/login/', {
        username,
        password
      });
      
      if (loginResponse.data.token) {
        localStorage.setItem('token', loginResponse.data.token);
        if (loginResponse.data.username) {
          localStorage.setItem('username', loginResponse.data.username);
        }
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.username) {
        setError('Username is already taken.');
      } else {
        setError('Failed to register. Please try again.');
      }
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
          Create a new account
        </p>
        
        {error && (
          <p className="body-md" style={{ color: 'var(--error)', marginBottom: 'var(--space-md)', textAlign: 'center' }}>
            {error}
          </p>
        )}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <input 
            type="text"
            placeholder="Choose a Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input 
            type="password"
            placeholder="Choose a Password"
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
            Register
          </button>
        </form>
        
        <p className="body-md" style={{ textAlign: 'center', marginTop: 'var(--space-xl)', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/login')}
          >
            Sign In here
          </span>
        </p>
      </div>
    </div>
  );
}
