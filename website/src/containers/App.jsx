import React, { useEffect, useState } from 'react';
import RenderAreaChart from './../components/RenderAreaChart';

const App = () => {

  const [ stats, setStats ] = useState({
    countConversationsByMonth: [],
    countConversations: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/conversations/stats')
    .then(data => data.json())
    .then(data => setStats(data));
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>Total de conversations 2019 {stats.countConversations}</h1>
      </div>
      <div className="dashboard">
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByMonth} />
        </div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default App;
