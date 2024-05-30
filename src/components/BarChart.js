//import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { getCompanyFunding } from '../api/api'; // Adjust the path as necessary
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import 'chart.js/auto';
// import '../BarChart.css'

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const BarChart = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     console.log('Fetching data from API');
//     getCompanyFunding()
//       .then(data => {
//         console.log('Data fetched:', data);
//         const labels = Object.keys(data);
//         const fundingValues = Object.values(data);

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: 'Company Funding',
//               data: fundingValues,
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch(error => {
//         console.log('Error fetching data:', error);
//       });
//   }, []);

//   console.log('Chart data:', chartData);

//   return (
//     <div>
//       {chartData.labels && chartData.labels.length > 0 ? (
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             title: { text: 'Company Funding', display: true },
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           }}
//         />
//       ) : (
//         <p>Loading chart data...</p>
//       )}
//     </div>
//   );
// };

// export default BarChart;


// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { getCompanyFunding } from '../api/api'; // Adjust the path as necessary
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import 'chart.js/auto';
// import '../BarChart.css';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const BarChart = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     console.log('Fetching data from API');
//     getCompanyFunding()
//       .then(data => {
//         console.log('Data fetched:', data);
//         const labels = Object.keys(data);
//         const fundingValues = Object.values(data);

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: 'Company Funding',
//               data: fundingValues,
//               backgroundColor: 'rgba(75, 192, 192, 0.6)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch(error => {
//         console.log('Error fetching data:', error);
//       });
//   }, []);

//   console.log('Chart data:', chartData);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     title: {
//       text: 'Company Funding',
//       display: true,
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <div className="chart-inner-container" style={{ width: `${chartData.labels?.length * 50}px` }}>
//         {chartData.labels && chartData.labels.length > 0 ? (
//           <Bar data={chartData} options={{
//                          responsive: true,
//                          title: { text: 'Company Funding', display: true },
//                          scales: {
//                            y: {
//                              beginAtZero: true,
//                            },
//                          },
//                        }} />
//         ) : (
//           <p>Loading chart data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BarChart;
/*sorted */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCompanyFunding } from '../api/api'; // Adjust the path as necessary
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import '../BarChart.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({});
  const [filter, setFilter] = useState('');
  const [allData, setAllData] = useState({});

  useEffect(() => {
    console.log('Fetching data from API');
    getCompanyFunding()
      .then(data => {
        console.log('Data fetched:', data);
        setAllData(data);
        updateChartData(data, '');
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const updateChartData = (data, filter) => {
    const filteredData = filter ? { [filter]: data[filter] } : data;
    const labels = Object.keys(filteredData).map(name => (name.length > 15 ? name.slice(0, 15) + '...' : name));
    const fundingValues = Object.values(filteredData);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Company Funding',
          data: fundingValues,
          backgroundColor: fundingValues.map((_, index) => {
            const greenValue = Math.floor((index / fundingValues.length) * 255);
            const redValue = 255 - greenValue;
            return `rgba(${redValue}, ${greenValue}, 0, 0.6)`;
          }),
          borderColor: fundingValues.map((_, index) => {
            const greenValue = Math.floor((index / fundingValues.length) * 255);
            const redValue = 255 - greenValue;
            return `rgba(${redValue}, ${greenValue}, 0, 1)`;
          }),
          borderWidth: 1,
        },
      ],
    });
  };

  const handleFilterChange = (event) => {
    const selectedCompany = event.target.value;
    setFilter(selectedCompany);
    updateChartData(allData, selectedCompany);
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: '10%',
      },
    },
    title: {
      text: 'Company Funding',
      display: true,
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          autoSkip: false,
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
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="chart-container">
      <div className="filter-container">
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Companies</option>
          {Object.keys(allData).map(company => (
            <option key={company} value={company}>
              {company.length > 15 ? company.slice(0, 15) + '...' : company}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-inner-container" style={{ height: `${Math.max(chartData.labels?.length * 20, 400)}px` }}>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default BarChart;
