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

  const [filter, setFilter] = useState('2019');

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/conversations/stats')
      .then(data => data.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>
          Total de conversations 2019 <b>{stats.countConversations}</b>
        </h1>
        <select value={filter}  onChange={e => handleChange(e)}>
          <option value="2019">2019</option>
          <option value="Enero">Enero</option>
          <option value="Febrero">Febrero</option>
          <option value="Marzo">Marzo</option>
        </select>
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
          {/* <RenderBubbleChart data={stats.groupByRateConversations} /> */}
        </div>
        <div className="card" />
      </div>
    </div>
  );
};

export default App;
