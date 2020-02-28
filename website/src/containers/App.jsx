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
      <h1>Total de conversations 2019 {stats.countConversations}</h1>
      <RenderAreaChart data={stats.countConversationsByMonth} />
    </div>
  );
};

export default App;
