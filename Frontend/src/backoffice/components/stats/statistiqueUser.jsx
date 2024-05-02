import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart } from '@mui/x-charts/PieChart';

const StatisticsPage = () => {
  const [signupStatistics, setSignupStatistics] = useState([]);
  const [specialtyStatistics, setSpecialtyStatistics] = useState([]);
  const [roleStatistics, setRoleStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rolePieData, setRolePieData] = useState([]);
  const [specialtyPieData, setSpecialtyPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [signupResponse, specialtyResponse, roleResponse] = await Promise.all([
          fetch('http://localhost:3700/users/signup-statistics').then(response => response.json()),
          fetch('http://localhost:3700/users/speciality-statistics').then(response => response.json()),
          fetch('http://localhost:3700/users/role-statistics').then(response => response.json())
        ]);
        setSignupStatistics(signupResponse);
        setSpecialtyStatistics(specialtyResponse);
        setRoleStatistics(roleResponse);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Error fetching statistics. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (roleStatistics.length > 0) {
      const pieData = roleStatistics.map(stat => ({
        value: stat.count,
        name: stat._id,
      }));
      setRolePieData(pieData);
    }
  }, [roleStatistics]);

  useEffect(() => {
    if (specialtyStatistics.length > 0) {
      const pieData = specialtyStatistics.map(stat => ({
        value: stat.count,
        name: stat._id,
      }));
      setSpecialtyPieData(pieData);
    }
  }, [specialtyStatistics]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', margin:'5%' }}>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Signup Statistics</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>These statistics show the number of signups per day.</p>
          <ul>
            {signupStatistics.map(stat => (
              <li key={stat._id}>{`Day ${stat._id}: ${stat.count} signups`}</li>
            ))}
          </ul>
        </div>
        <div style={{ width: '30%', }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Signup Statistics Pie Chart</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>This pie chart visualizes the distribution of signups per day.</p>
          <PieChart
            series={[{ data: signupStatistics.map(stat => ({ value: stat.count, name: `Day ${stat._id}` })) }]}
            width={300}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Line Chart</h2>
          <LineChart width={300} height={200} data={signupStatistics}>
            <XAxis dataKey="_id"/>
            <YAxis type="number"/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px',margin:'5%' }}>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Specialty Statistics</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>These statistics show the number of users per specialty.</p>
          <ul>
            {specialtyStatistics.map(stat => (
              <li key={stat._id}>{`${stat._id}: ${stat.count} users`}</li>
            ))}
          </ul>
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Specialty Statistics Pie Chart</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>This pie chart visualizes the distribution of users across different specialties.</p>
          <PieChart
            series={[{ data: specialtyStatistics.map(stat => ({ value: stat.count, name: stat._id })) }]}
            width={300}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Line Chart</h2>
          <LineChart width={300} height={200} data={specialtyStatistics}>
            <XAxis dataKey="_id"/>
            <YAxis type="number"/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px',margin:'5%' }}>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Role Statistics</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>These statistics show the number of users per role.</p>
          <ul>
            {roleStatistics.map(stat => (
              <li key={stat._id}>{`${stat._id}: ${stat.count} users`}</li>
            ))}
          </ul>
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Role Statistics Pie Chart</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>This pie chart visualizes the distribution of users across different roles.</p>
          <PieChart
            series={[{ data: rolePieData }]}
            width={300}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Line Chart</h2>
          <LineChart width={300} height={200} data={roleStatistics}>
            <XAxis dataKey="_id"/>
            <YAxis type="number"/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
