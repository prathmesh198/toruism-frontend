import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import ExploreScreen from './screens/ExploreScreen';
import DestinationDetailScreen from './screens/DestinationDetailScreen';
import { User } from 'lucide-react';
import './index.css';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Layout component to simulate the header
function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/login';

  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'BharatTour Lite';
      case '/dashboard': return 'Analytics Dashboard';
      case '/explore': return 'Explore Destinations';
      default: return 'BharatTour Lite';
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('https://tourist-backend-j0qo.onrender.com/api/logout/', {}, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
      }
    } catch (e) {
      console.error('Logout failed:', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/login');
    }
  };

  const username = localStorage.getItem('username');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLogin && (
        <header className="glass-nav" style={{ 
          padding: 'var(--space-md) var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            {location.pathname !== '/' && (
              <button 
                onClick={() => navigate(-1)}
                className="btn btn-ghost"
                style={{ padding: '8px 12px' }}
              >
                &larr; Back
              </button>
            )}
            <h1 className="title-lg text-gradient" style={{ margin: 0 }}>{getTitle()}</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            {username && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <User size={20} className="text-primary" />
                <span className="body-md" style={{ fontWeight: 500 }}>
                  Hi, {username}
                </span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Logout
            </button>
          </div>
        </header>
      )}
      <main className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><ExploreScreen /></ProtectedRoute>} />
          <Route path="/destination/:id" element={<ProtectedRoute><DestinationDetailScreen /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
