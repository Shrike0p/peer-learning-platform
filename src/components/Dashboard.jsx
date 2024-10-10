import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Your Dashboard</h2>
      <p>Current Level: 2</p>
      <p>Weekly Challenges: Start a new challenge!</p>
      <div>Upcoming Sessions:</div>
      <ul>
        <li>Session with Alice on Monday, 7 PM</li>
        <li>Session with Bob on Wednesday, 6 PM</li>
      </ul>
    </div>
  );
};

export default Dashboard;
