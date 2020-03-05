import React, { useState } from 'react';
import RenderAreaChart from '../components/RenderAreaChart';
import RenderPieChart from '../components/RenderPieChart';
import RenderStackedBarChart from '../components/RenderStackedBarChart';
import RenderBubbleChart from '../components/RenderBubbleChart';

const App = () => {
  const [stats] = useState({
    countConversationsByMonth: [
      { name: 'Enero', value: 434 },
      { name: 'Febrero', value: 363 },
      { name: 'Marzo', value: 242 },
      { name: 'Abril', value: 842 },
    ],
    countConversations: 23,
    groupByRateConversations: [
      { name: '1', value: 100 },
      { name: '2', value: 200 },
      { name: '3', value: 300 },
      { name: '4', value: 400 },
      { name: '5', value: 500 },
    ],
    groupByRateConversationsByMonth: [
      { name: 'Enero', 1: 100, 2: 200, 3: 300, 4: 400, 5: 500 },
      { name: 'Febrero', 1: 234, 2: 454, 3: 453, 4: 978, 5: 500 },
      { name: 'Marzo', 1: 345, 2: 545, 3: 343, 4: 343, 5: 500 },
      { name: 'Abril', 1: 345, 2: 545, 3: 343, 4: 0, 5: 500 },
    ],
    groupByConversationbyHour: {
      1: {
        title: 'monday',
        data: [
          { hour: '12a', index: 1, value: 170 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 400 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 170 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 170 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 170 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      2: {
        title: 'tuesday',
        data: [
          { hour: '12a', index: 1, value: 160 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 100 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 160 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 160 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 160 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      3: {
        title: 'wednesday',
        data: [
          { hour: '12a', index: 1, value: 170 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 400 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 170 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 170 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 170 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      4: {
        title: 'thursday',
        data: [
          { hour: '12a', index: 1, value: 160 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 100 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 160 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 160 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 160 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      5: {
        title: 'friday',
        data: [
          { hour: '12a', index: 1, value: 170 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 400 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 170 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 170 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 170 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      6: {
        title: 'saturday',
        data: [
          { hour: '12a', index: 1, value: 160 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 100 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 160 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 160 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 160 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
      7: {
        title: 'sunday',
        data: [
          { hour: '12a', index: 1, value: 170 },
          { hour: '1a', index: 1, value: 180 },
          { hour: '2a', index: 1, value: 150 },
          { hour: '3a', index: 1, value: 120 },
          { hour: '4a', index: 1, value: 200 },
          { hour: '5a', index: 1, value: 300 },
          { hour: '6a', index: 1, value: 400 },
          { hour: '7a', index: 1, value: 200 },
          { hour: '8a', index: 1, value: 100 },
          { hour: '9a', index: 1, value: 150 },
          { hour: '10a', index: 1, value: 160 },
          { hour: '11a', index: 1, value: 170 },
          { hour: '12a', index: 1, value: 180 },
          { hour: '1p', index: 1, value: 144 },
          { hour: '2p', index: 1, value: 166 },
          { hour: '3p', index: 1, value: 145 },
          { hour: '4p', index: 1, value: 150 },
          { hour: '5p', index: 1, value: 170 },
          { hour: '6p', index: 1, value: 180 },
          { hour: '7p', index: 1, value: 165 },
          { hour: '8p', index: 1, value: 130 },
          { hour: '9p', index: 1, value: 140 },
          { hour: '10p', index: 1, value: 170 },
          { hour: '11p', index: 1, value: 180 },
        ],
      },
    },
  });

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/conversations/stats')
  //   .then(data => data.json())
  //   .then(data => setStats(data));
  // }, []);

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
