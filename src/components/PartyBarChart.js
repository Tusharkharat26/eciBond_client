import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getpartyFunding } from '../api/api'; // Correct path to api.js
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import '../PartyBarChart.css'; // Ensure you have this CSS file

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PartyBarChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getpartyFunding()
      .then((data) => {
        const labels = Object.keys(data);
        const fundingValues = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Party Funding',
              data: fundingValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.log('Error fetching party funding data:', error));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Makes the chart horizontal
    title: {
      text: 'Party Funding',
      display: true,
    },
    scales: {
      x: {
        beginAtZero: true,
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
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="chart-container">
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PartyBarChart;
