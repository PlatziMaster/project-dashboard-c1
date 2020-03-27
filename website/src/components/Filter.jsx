import React, { useEffect, useState } from 'react';
import {
  sub,
  format,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

const Filter = ({ updateFilter }) => {

  const today = new Date();
  const todayFormat = format(today, 'yyyy/MM/dd');
  const [filter, setFilter] = useState(0);

  let filters = [
    {
      label: 'Últimos 7 días',
      startAt: format(sub(today, {days: 7}), 'yyyy/MM/dd'),
      endAt: todayFormat
    },
    {
      label: 'Últimos 28 días',
      startAt: format(sub(today, {days: 28}), 'yyyy/MM/dd'),
      endAt: todayFormat
    },
    {
      label: 'Últimos 90 días',
      startAt: format(sub(today, {days: 90}), 'yyyy/MM/dd'),
      endAt: todayFormat
    },
    {
      label: 'Últimos 365 días',
      startAt: format(sub(today, {days: 365}), 'yyyy/MM/dd'),
      endAt: todayFormat
    },
    {
      label: '2020',
      startAt: format(startOfYear(today), 'yyyy/MM/dd'),
      endAt: todayFormat
    },
    {
      label: '2019',
      startAt: format(startOfYear(sub(today, {years: 1})), 'yyyy/MM/dd'),
      endAt: format(endOfYear(sub(today, {years: 1})), 'yyyy/MM/dd')
    }
  ];

  for (let index = 1; index <= 3; index++) {
    const monthPrev = sub(today, {months: index});
    filters.push({
      label: format(monthPrev, 'MMMM'),
      startAt: format(startOfMonth(monthPrev), 'yyyy/MM/dd'),
      endAt: format(endOfMonth(monthPrev), 'yyyy/MM/dd')
    });
  }

  const handleFilterChange = (event) => {
    const option = filters[event.target.value];
    updateFilter(option);
    setFilter(event.target.value);
  }


  return (
    <div>
      <select onChange={handleFilterChange} value={filter}>
        { filters.map((item, index) => <option  key={index} value={index}>{item.label}</option> )}
      </select>
    </div>
  );

};

export default Filter;