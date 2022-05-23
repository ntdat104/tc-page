/** App.js */
import React from 'react';
import MultilineChart from '../views/MultilineChart';
import Legend from '../components/Legend';
import './styles.css';

export default function MultilineChartModule({ data, code }) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [
    {
      name: ` ${code}`,
      color: '#E14040',
      items: data.map((d) => ({ ...d, date: new Date(d.date) })),
    },
  ];
  const chartData = [
    {
      name: ` ${code}`,
      color: '#E14040',
      items: data.map((d) => ({ ...d, date: new Date(d.date) })),
    },
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
    </div>
  );
}
