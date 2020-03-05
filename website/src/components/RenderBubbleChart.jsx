import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ScatterComponnent from './ScatterComponent';
import '../styles/components/RenderBubbleChart.styl';

// quitar los numeros de abajo de la grafica tick={{ fontSize: 0 }}

const parseDomain = (keys, data) => {
  let maxNumber = [];
  maxNumber = [
    ...maxNumber,
    keys.map(item => {
      return Math.max.apply(
        null,
        data[item].data.map(entry => entry.value)
      );
    }),
  ];
  return [0, Math.max.apply(null, ...maxNumber)];
};

const RenderBubbleChart = ({ data }) => {
  let i = 0;
  // console.log(JSON.stringify(data));
  const keys = Object.keys(data);
  const domain = parseDomain(keys, data);
  // console.log(domain);
  const range = [16, 225];
  return (
    <div className="RenderBubbleChart__Wrapper">
      <div className="RenderBubbleChart__Container">
        <ResponsiveContainer width="100%" height="100%">
          <div>
            {keys.map(item => {
              i += 1;
              return (
                <ScatterComponnent
                  key={i}
                  data={data[item].data}
                  title={data[item].title}
                  domain={domain}
                  range={range}
                />
              );
            })}
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenderBubbleChart;
