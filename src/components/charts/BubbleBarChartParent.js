import React, { useState } from 'react';
import PartyWiseDonation from './PartyWiseDonation';
import PartyBubbleChart from './PartyBubbleChart';


import './ChartStyles.css';

const BubbleBarChartParent = () => {
  const [selectedParty, setSelectedParty] = useState('');

  const handlePartySelect = (partyName) => {
    setSelectedParty(partyName);
  };

  return (
    <div className="parent-container">
      <PartyBubbleChart onSelectParty={handlePartySelect} />
      <div className="chart-section">
        <h2>Party-wise Donations</h2>
        <PartyWiseDonation partyName={selectedParty} />
      </div>
    </div>
  );
};

export default BubbleBarChartParent;
