import React, { useEffect, useState } from 'react';
import RenderAreaChart from './../components/RenderAreaChart';
import RenderPieChart from './../components/RenderPieChart';
import RenderStackedBarChart from './../components/RenderStackedBarChart';

const App = () => {

  const [ stats, setStats ] = useState({
    countConversationsByMonth: [
      {name: 'Enero', value: Math.random()},
      {name: 'Febrero', value: Math.random()},
      {name: 'Marzo', value: Math.random()},
      {name: 'Abril', value: Math.random()},
    ],
    countConversations: 232,
    groupByRateConversations: [
      {name: '1', value: Math.random()},
      {name: '2', value: Math.random()},
      {name: '3', value: Math.random()},
      {name: '4', value: Math.random()},
      {name: '5', value: Math.random()},
    ],
    groupByRateConversationsByMonth: [
      {name: 'Enero', 1: Math.random(), 2: Math.random(), 3: Math.random(), 4: Math.random()},
      {name: 'Febrero', 1: Math.random(), 2: Math.random(), 3: Math.random(), 4: Math.random()},
      {name: 'Marzo', 1: Math.random(), 2: Math.random(), 3: Math.random(), 4: Math.random()},
      {name: 'Abril', 1: Math.random(), 2: Math.random(), 3: Math.random(), 4: Math.random()},
    ]
  });

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/conversations/stats')
  //   .then(data => data.json())
  //   .then(data => setStats(data));
  // }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>Total de conversations 2019 {stats.countConversations}</h1>
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
      </div>
    </div>
  );
};

export default App;
