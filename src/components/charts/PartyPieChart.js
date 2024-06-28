// // src/components/PartyPieChart.js
// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { getPartyList } from '../../api/api';
// import PartyDropdown from './PartyDropdown';
// import 'chart.js/auto';
// import './ChartStyles.css';

// const PartyPieChart = ({ onSelectParty }) => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     getPartyList().then(data => {
//       const labels = Object.keys(data);
//       const fundingValues = Object.values(data);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Party Donations',
//             data: fundingValues,
//             backgroundColor: labels.map(() =>
//               `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`
//             ),
//             borderColor: 'rgba(0, 0, 0, 0.1)',
//             borderWidth: 1,
//           },
//         ],
//       });
//     }).catch(error => console.log('Error fetching data:', error));
//   }, []);

//   const handlePieClick = (elements) => {
//     if (elements.length > 0) {
//       const index = elements[0].index;
//       const partyName = chartData.labels[index];
//       onSelectParty(partyName);
//     }
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const partyName = chartData.labels[context.dataIndex];
//             const totalFunding = context.raw;
//             return `${partyName}: ${totalFunding}`;
//           }
//         }
//       }
//     },
//     onClick: (event, elements) => {
//       handlePieClick(elements);
//     }
//   };

//   return (
//     <div className="pie-chart-container">
//       <PartyDropdown onPartySelect={onSelectParty} />
//       {chartData.labels && chartData.labels.length > 0 ? (
//         <Pie data={chartData} options={options} />
//       ) : (
//         <p>Loading chart data...</p>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getPartyList } from '../../api/api';
import PartyDropdown from './PartyDropdown';
import 'chart.js/auto';
import './ChartStyles.css';

const PartyPieChart = ({ onSelectParty }) => {
  const [chartData, setChartData] = useState({});
  const [activeSlice, setActiveSlice] = useState(null);

  useEffect(() => {
    getPartyList()
      .then(data => {
        const labels = Object.keys(data);
        const fundingValues = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Party Donations',
              data: fundingValues,
              backgroundColor: labels.map(() =>
                `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`
              ),
              borderColor: 'rgba(1, 0, 0, 0.1)',
              borderWidth: 1,
              hoverOffset: 10, // Default hover offset for all slices
            },
          ],
        });
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  const handlePieClick = (elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setActiveSlice(index); // Set the active slice index
      const partyName = chartData.labels[index];
      onSelectParty(partyName);
    } else {
      setActiveSlice(null); // Deselect if clicking outside
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const partyName = chartData.labels[context.dataIndex];
            const totalFunding = context.raw;
            return `${partyName}: ${totalFunding}`;
          },
        },
      },
      beforeDraw: (chart) => {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
        ctx.save();
        ctx.clearRect(left, top, width, height);
        ctx.restore();
      },
      afterDraw: (chart) => {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
        const activeElements = chart.getDatasetMeta(0).data[activeSlice];

        if (activeElements) {
          const centerX = (left + right) / 2;
          const centerY = (top + bottom) / 2;
          const offset = 20; // Custom zoom out effect for the active slice

          const model = activeElements.tooltipPosition();
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, model.outerRadius + offset, model.startAngle, model.endAngle);
          ctx.lineTo(centerX, centerY);
          ctx.closePath();
          ctx.clip();

          ctx.fillStyle = activeElements.options.backgroundColor;
          ctx.fill();

          ctx.restore();
        }
      }
    },
    onClick: (event, elements) => {
      handlePieClick(elements);
    },
    hover: {
      onHover: (event, chartElement) => {
        if (chartElement.length) {
          event.native.target.style.cursor = 'pointer';
        } else {
          event.native.target.style.cursor = 'default';
        }
      },
    },
    animation: {
      duration: 500,
      easing: 'easeOutBounce',
    },
  };

  return (
    <div className="pie-chart-container">
      <PartyDropdown onPartySelect={onSelectParty} />
      {chartData.labels && chartData.labels.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PartyPieChart;
