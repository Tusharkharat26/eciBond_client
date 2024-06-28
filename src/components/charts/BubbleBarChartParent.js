import React, { useState } from 'react';
import PartyWiseDonation from './PartyWiseDonation';
//import PartyBubbleChart from './PartyBubbleChart';
import PartyPieChart from './PartyPieChart';
import './ChartStyles.css';

const BubbleBarChartParent = () => {
  const [selectedParty, setSelectedParty] = useState('');

  const handlePartySelect = (partyName) => {
    setSelectedParty(partyName);
  };

  return (
    <div className="parent-container">
      <div className="chart-section">
        <h2>Pie Chart</h2>
        <PartyPieChart onSelectParty={handlePartySelect} />
      </div>
      
      <div className="chart-section">
        <h2>Party-wise Donations</h2>
        <PartyWiseDonation partyName={selectedParty} />
      </div>
    </div>
  );
};

export default BubbleBarChartParent;
