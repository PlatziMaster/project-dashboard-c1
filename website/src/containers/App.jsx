import React, { useState, useEffect } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';

const App = () => {
  const [stats, setStats] = useState({ 
    countConversationsByMonth: [],
    countConversations: 0,
    groupByRateConversations: [],
    groupByRateConversationsByMonth: [],
    groupByConversationbyHour: []

  })
     useEffect(() => {
     fetch('http://localhost:3000/api/conversations/stats')
     .then(data => data.json())
     .then(data => setStats(data))
   }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>
          Total de conversations 2019 
          {stats.countConversations} 
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
          <RenderBubbleChart data={stats.groupByConversationbyHour} />
        </div>
      </div>
    </div>
  );
};

export default App;
