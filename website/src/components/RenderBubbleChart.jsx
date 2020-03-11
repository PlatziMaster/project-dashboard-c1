import React from 'react';
import {
  XAxis,
  YAxis,
  ZAxis,
  Scatter,
  Tooltip,
  ScatterChart,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default class RenderBubbleChart extends React.Component {
  renderTooltip = lbl => {
    const { active, payload } = lbl;

    if (active && payload && payload.length) {
      const data = payload[0].payload;
      console.log(data);
      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            margin: 0,
            padding: 10,
          }}
        >
          <p>Rate:{data.name}</p>
          <p>
            <span>Length: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  };

  parseDomain = () => {
    const { data } = this.props;
    return [
      0,
      Math.max(
        Math.max.apply(
          null,
          data.map(entry => entry.value)
        )
      ),
    ];
  };

  render() {
    const domain = this.parseDomain();
    const range = [0, 225];
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="name" name="value" />
          <YAxis dataKey="value" name="length" />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={this.renderTooltip}
          />
          <Legend />
          <Scatter name="Length by Rate" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
