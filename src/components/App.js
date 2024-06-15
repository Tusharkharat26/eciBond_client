// src/components/App.js
import React, { useState } from 'react';
import '../App.css'; // Adjust the path to point to src/App.css
import PartyWiseDonation from './charts/PartyWiseDonation';
import PartyDropdown from './charts/PartyDropdown';
import PartyBubbleChart from './charts/PartyBubbleChart';

const App = () => {
  const [partyName, setPartyName] = useState('');

  const handlePartySelect = (selectedParty) => {
    setPartyName(selectedParty);
  };

  return (
    <div className="App">
      <h1>Party-wise Donation Data</h1>
      <PartyDropdown onPartySelect={handlePartySelect} />
      <PartyWiseDonation partyName={partyName} />
     <PartyBubbleChart partyName={partyName}/>
    </div>
  );
};

export default App;
