import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RenderStackedBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="1" stackId="a" fill="#FED13D" />
        <Bar dataKey="2" stackId="a" fill="#10dc60" />
        <Bar dataKey="3" stackId="a" fill="#B70000" />
        <Bar dataKey="4" stackId="a" fill="#0cd1e8" />
        <Bar dataKey="5" stackId="a" fill="#7044ff" />
        <Bar dataKey="6" stackId="a" fill="#000000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RenderStackedBarChart;