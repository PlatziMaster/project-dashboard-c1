import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis } from 'recharts';

const ScatterComponnent = props => {
  const { title, domain, data, range } = props;
  return (
    <ScatterChart
      width={800}
      height={60}
      margin={{
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <XAxis
        type="category"
        dataKey="hour"
        name="hour"
        interval={0}
        tickLine={{ transform: 'translate(0, -6)' }}
      />
      <YAxis
        type="number"
        dataKey="index"
        name="sunday"
        height={10}
        width={80}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: title, position: 'insideRight' }}
      />
      <ZAxis type="number" dataKey="value" domain={domain} range={range} />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterComponnent;
