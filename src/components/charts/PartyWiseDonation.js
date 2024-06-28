import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getPartywiseDonation } from '../../api/api';
import 'chart.js/auto';
import './ChartStyles.css';

const PartyWiseDonation = ({ partyName }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (partyName) {
      console.log(`Fetching data for party: ${partyName}`);
      getPartywiseDonation(partyName)
        .then(data => {
          console.log('Data fetched:', data);

          const labels = Object.keys(data);
          const donationValues = Object.values(data);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Company Donations',
                data: donationValues,
                backgroundColor: labels.map(() =>
                  `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
                ),
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                barThickness: Math.min(50, Math.max(15, 100 / labels.length)),  // Adjust bar thickness
                categoryPercentage: 0.8,
                barPercentage: 0.9,
              },
            ],
          });
          setLoading(false);
        })
        .catch(error => {
          console.log('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [partyName]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const companyName = chartData.labels[context.dataIndex];
            const totalFunding = context.raw;
            return `${companyName}: ${totalFunding}`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        alert(`Company: ${chartData.labels[index]}, Funding: ${chartData.datasets[0].data[index]}`);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    }
  };

  return (
    <div
      className="bar-chart-container"
      style={{ height: `${chartData.labels ? chartData.labels.length * 50 : 500}px` }} // Dynamic height
    >
      {loading ? (
        <p>Loading chart data...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default PartyWiseDonation;
