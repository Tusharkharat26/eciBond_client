import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getPartywiseDonation } from '../api/api'; // Adjust the path as necessary
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import '../PartyWiseDonation.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PartyWiseDonation = ({ partyName }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    console.log('Fetching data from API');
    getPartywiseDonation(partyName)
      .then(data => {
        console.log('Data fetched:', data);
        const labels = Object.keys(data);
        const donationValues = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Donations',
              data: donationValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, [partyName]);

  const options = {
    indexAxis: 'y', // Horizontal bars
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: 'Party-wise Donations by Company',
      display: true,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: false, // Show all y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'y',
      intersect: false,
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-scroll-container">
        <div className="chart-inner-container" style={{ height: `${chartData.labels?.length * 20}px` }}>
          {chartData.labels && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={options} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyWiseDonation;
