import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/components/RenderPieChart.styl';

const RenderPieChart = ({ data }) => {
  return (
    <div className="RenderPieChart__Wrapper">
      <div className="RenderPieChart__Container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenderPieChart;
