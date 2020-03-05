import React, { useEffect, useState } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';
import '../styles/components/App.styl';

const App = () => {
  const [stats, setStats] = useState({
    countConversationsByMonth: [],
    countConversations: 0,
    groupByRateConversations: [],
    groupByRateConversationsByMonth: [],
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/conversations/stats')
      .then(data => data.json())
      .then(data => {
        setStats(data);
      });
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>
          Total de conversations 2019 <b>{stats.countConversations}</b>
        </h1>
      </div>
      <div className="grid">
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByMonth} />
        </div>
        <div className="card">
          <RenderPieChart data={stats.groupByRateConversations} />
        </div>
        <div className="card">
          <RenderStackedBarChart data={stats.groupByRateConversationsByMonth} />
        </div>
        <div className="card">
          <RenderBubbleChart data={stats.groupByRateConversations} />
        </div>
        <div className="card" />
      </div>
    </div>
  );
};

export default App;
