import React, { useEffect, useState } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';
import '../styles/components/App.styl';

const App = () => {
  const [stats, setStats] = useState({
    countConversations: 0,
    countConversationsByYears: [],
    countConversationsByMonths: [],
    countConversationsByDays: [],
  });

  const [filter, setFilter] = useState('2019');

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/conversations/stats')
      .then(data => data.json())
      .then(data =>  setStats(data));
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
          <RenderAreaChart data={stats.countConversationsByYears} />
        </div>
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByMonths} />
        </div>
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByDays} />
        </div>
        {/* <div className="card">
          <RenderPieChart data={stats.groupByRateConversations} />
        </div>
        <div className="card">
          <RenderStackedBarChart data={stats.groupByRateConversationsByMonth} />
        </div> */}
        <div className="card">
          {/* <RenderBubbleChart data={stats.groupByRateConversations} /> */}
        </div>
        <div className="card" />
      </div>
    </div>
  );
};

export default App;
