import React from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip
} from 'recharts';

const RenderPieChart = ({data}) => {
  return (
    <PieChart
      width={400}
      height={400}
    >
      <Pie
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label/>
      <Tooltip/>
    </PieChart>
  );
};

export default RenderPieChart;