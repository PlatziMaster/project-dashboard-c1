import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
  '1': '#FED13D',
  '2': '#10dc60',
  '3': '#B70000',
  '4': '#0cd1e8',
  '5': '#7044ff',
  '6': '#ff509e',
};

const RenderPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} label>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)
          }
         </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RenderPieChart;
