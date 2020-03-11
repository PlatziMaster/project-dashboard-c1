import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const RenderPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RenderPieChart;
