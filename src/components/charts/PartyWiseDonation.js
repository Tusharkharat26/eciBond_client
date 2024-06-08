import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getPartywiseDonation } from '../../api/api';
import 'chart.js/auto';
import './ChartStyles.css'

const PartyWiseDonation = ({ partyName }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (partyName) {
      getPartywiseDonation(partyName)
        .then(data => {
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
              },
            ],
          });
        })
        .catch(error => console.log('Error fetching data:', error));
    }
  }, [partyName]);

  const options = {
    indexAxis: 'y',
    responsive: false, // Turn off responsive resizing
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
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Prevent skipping of labels
        }
      },
      y: {
        ticks: {
          autoSkip: false, // Prevent skipping of labels
        },
        barThickness: 30, // Set a fixed bar thickness
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        alert(`Company: ${chartData.labels[index]}, Funding: ${chartData.datasets[0].data[index]}`);
      }
    }
  };

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-inner-container">
        {chartData.labels && chartData.labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default PartyWiseDonation;
