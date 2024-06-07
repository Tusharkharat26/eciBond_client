import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { getPartywiseDonation } from '../../api/api';
import PartyDropdown from './PartyDropdown';
import 'chart.js/auto';
import './ChartStyles.css';

const PartyBubbleChart = ({ onSelectParty }) => {
  const [chartData, setChartData] = useState({});
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    getPartywiseDonation().then(data => {
      const labels = Object.keys(data);
      const fundingValues = Object.values(data);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Party Donations',
            data: fundingValues.map((value, index) => ({ x: index, y: value, r: value / 1000000 })),
            backgroundColor: labels.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`),
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
          },
        ],
      });
    }).catch(error => console.log('Error fetching data:', error));
  }, []);

  const handleBubbleClick = (context) => {
    if (context.length > 0) {
      const index = context[0].index;
      const partyName = chartData.labels[index];
      setSelectedParty(partyName);
      onSelectParty(partyName);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const partyName = chartData.labels[context.dataIndex];
            const totalFunding = context.raw.y;
            return `${partyName}: ${totalFunding}`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      handleBubbleClick(elements);
    }
  };

  return (
    <div className="bubble-chart-container">
      <PartyDropdown onPartySelect={onSelectParty} />
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bubble data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PartyBubbleChart;
