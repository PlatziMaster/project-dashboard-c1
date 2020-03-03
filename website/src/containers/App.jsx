import React, { useEffect, useState } from 'react';
import RenderAreaChart from './../components/RenderAreaChart';
import RenderPieChart from './../components/RenderPieChart';
import RenderStackedBarChart from './../components/RenderStackedBarChart';

const App = () => {

  const [ stats, setStats ] = useState({
    countConversationsByMonth: [
      {name: 'Enero', value: 12},
      {name: 'Febrero', value: 23},
      {name: 'Marzo', value: 45},
      {name: 'Abril', value: 75},
    ],
    countConversations: 23,
    groupRateConversations: [
      {name: '1', value: 400},
      {name: '2', value: 300},
      {name: '3', value: 300},
      {name: '4', value: 200},
      {name: '5', value: 200},
    ],
    groupRateConversationsByMonth: [
      {name: 'Enero', 1: 400, 2: 233, 3: 223, 4: 123},
      {name: 'Febrero', 1: 234, 2: 454, 3: 453, 4: 978},
      {name: 'Marzo', 1: 345, 2: 545, 3: 343, 4: 343},
      {name: 'Abril', 1: 345, 2: 545, 3: 343, 4: 343},
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
      <div className="dashboard">
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByMonth} />
        </div>
        <div className="card">
          <RenderPieChart data={stats.groupRateConversations} />
        </div>
        <div className="card">
          <RenderStackedBarChart data={stats.groupRateConversationsByMonth} />
        </div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default App;
