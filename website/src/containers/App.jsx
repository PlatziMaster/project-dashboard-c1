import React, { useEffect, useState } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';
import '../styles/components/App.styl';

import Filter from '../components/Filter';

import { sub, format } from 'date-fns';

const App = () => {
  const [stats, setStats] = useState({
    countConversations: 0,
    countConversationsByTime: [],
  });

  useEffect(() => {
    const today = new Date();
    const endAt = format(today, 'yyyy/MM/dd');
    const startAt = format(sub(today, {days: 7}), 'yyyy/MM/dd');
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
      .then(data => data.json())
      .then(data => setStats(data));
  }, []);

  const updateFilter = (option) => {
    const endAt = option.endAt;
    const startAt = option.startAt;
    fetch(`http://localhost:3000/api/conversations/stats?start_date=${startAt}&end_date=${endAt}`)
      .then(data => data.json())
      .then(data => setStats(data));
  }

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
