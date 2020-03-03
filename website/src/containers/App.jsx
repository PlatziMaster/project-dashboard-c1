import React, { useEffect, useState } from 'react';
import RenderAreaChart from './../components/RenderAreaChart';
import RenderPieChart from './../components/RenderPieChart';
import RenderStackedBarChart from './../components/RenderStackedBarChart';

const App = () => {

  const [ stats, setStats ] = useState({
    countConversationsByMonth: [
      {name: 'Enero', value: 434},
      {name: 'Febrero', value: 363},
      {name: 'Marzo', value: 242},
      {name: 'Abril', value: 842},
    ],
    countConversations: 23,
    groupByRateConversations: [
      {name: '1', value: 100},
      {name: '2', value: 200},
      {name: '3', value: 300},
      {name: '4', value: 400},
      {name: '5', value: 500},
    ],
    groupByRateConversationsByMonth: [
      {name: 'Enero', 1: 100, 2: 200, 3: 300, 4: 400, 5: 500},
      {name: 'Febrero', 1: 234, 2: 454, 3: 453, 4: 978, 5: 500},
      {name: 'Marzo', 1: 345, 2: 545, 3: 343, 4: 343, 5: 500},
      {name: 'Abril', 1: 345, 2: 545, 3: 343, 4: 0, 5: 500},
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
        <div className="card">

        </div>
      </div>
    </div>
  );
};

export default App;
