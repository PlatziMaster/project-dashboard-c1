import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RenderPieChart = ({ data }) => {
  const COLORS = ['#FED13D', '#10dc60', '#B70000', '#0cd1e8', '#7044ff',  '#000000'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} label dataKey="value">
          { data.map((entry, index) => <Cell fill={COLORS[index]}/>) }
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RenderPieChart;
