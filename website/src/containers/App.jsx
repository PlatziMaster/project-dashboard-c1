import React, { useEffect, useState } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';
import Filter from '../components/Filter';
import '../styles/components/App.styl';
import {
  sub,
  format,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
 }
 from 'date-fns';

const App = () => {
  const [stats, setStats] = useState({
    countConversations: 0,
    countConversationsByTime: [],
  });

  const updateFilter = (filter) => {
    const startAt = filter.startAt;
    const endAt = filter.endAt;
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
    .then(data => data.json())
    .then(data => setStats(data));
  }

  useEffect(() => {
    const today = new Date();
    const startAt = format(sub(today, {days: 7}), 'yyyy/MM/dd');
    const endAt = format(today, 'yyyy/MM/dd');
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
      .then(data => data.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>
          Total de conversations 2019 <b>{stats.countConversations}</b>
        </h1>
        <Filter updateFilter={updateFilter} />
      </div>
      <div className="grid">
        <div className="card">
          <RenderAreaChart data={stats.countConversationsByTime} />
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
