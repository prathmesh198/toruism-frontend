import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';

export default function DestinationDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const destResponse = await axios.get(`https://toruism-frontend-eo2n.vercel.app/api/destinations/${id}/`);
        setDestination(destResponse.data);

        // Fetch forecast data
        const forecastResponse = await axios.get('https://toruism-frontend-eo2n.vercel.app/api/forecast/');
        setForecast(forecastResponse.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="center-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="center-container">
        <h2 className="headline-md text-muted">Destination not found.</h2>
      </div>
    );
  }

  // Format data for the bar chart
  const regionalData = forecast ? Object.keys(forecast.regional_breakdown).map(region => ({
    name: region,
    tourists: forecast.regional_breakdown[region]
  })) : [];

  // Generate simulated 6-month prediction based on base forecast
  const currentMonth = new Date().getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const trendData = forecast ? Array.from({ length: 6 }).map((_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    const variation = 1 + (Math.random() * 0.25 - 0.1); 
    return {
      month: months[monthIndex],
      predicted: Math.floor(forecast.forecasted_tourists * variation)
    };
  }) : [];

  return (
    <div className="page-container slide-up" style={{ flex: 1 }}>
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-ghost"
        style={{ marginBottom: 'var(--space-md)', paddingLeft: 0 }}
      >
        &larr; Back to Explore
      </button>

      {/* Destination Info */}
      <div className="glass-panel" style={{ overflow: 'hidden', marginBottom: 'var(--space-xl)' }}>
        {destination.image_url && (
          <img 
            src={destination.image_url} 
            alt={destination.name}
            style={{ width: '100%', height: '450px', objectFit: 'cover' }} 
          />
        )}
        <div style={{ padding: 'var(--space-xl)' }}>
          <h1 className="display-sm text-gradient" style={{ marginBottom: 'var(--space-sm)' }}>
            {destination.name}
          </h1>
          <p className="title-lg" style={{ color: 'var(--primary)', marginBottom: 'var(--space-lg)' }}>
            📍 {destination.location}
          </p>
          <p className="body-lg" style={{ color: 'var(--text-muted)' }}>
            {destination.description}
          </p>
        </div>
      </div>

      {/* Prediction Graphs */}
      {forecast && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-lg)' }}>
          
          {/* 6-Month Trend */}
          <div className="glass-panel" style={{ padding: 'var(--space-xl)' }}>
            <h3 className="headline-md" style={{ color: 'var(--text-main)', marginBottom: 'var(--space-lg)' }}>
              6-Month Tourism Prediction
            </h3>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                  <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', background: 'var(--surface-solid)' }}
                    formatter={(value) => [`${value.toLocaleString()}`, 'Predicted Tourists']}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="predicted" name="Predicted Tourists" stroke="var(--primary)" strokeWidth={4} dot={{ r: 5, fill: 'var(--surface-solid)', strokeWidth: 3 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Breakdown */}
          <div className="glass-panel" style={{ padding: 'var(--space-xl)' }}>
            <h3 className="headline-md" style={{ color: 'var(--text-main)', marginBottom: 'var(--space-lg)' }}>
              Regional Impact ({forecast.year})
            </h3>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                  <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)', background: 'var(--surface-solid)' }}
                  />
                  <Bar dataKey="tourists" name="Tourists" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
