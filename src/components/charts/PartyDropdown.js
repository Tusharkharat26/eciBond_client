import React, { useEffect, useState } from 'react';
import { getPartyList } from '../../api/api';
import './ChartStyles.css';

const PartyDropdown = ({ onPartySelect }) => {
  const [parties, setParties] = useState({});

  useEffect(() => {
    getPartyList()
      .then(data => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setParties(data);
        } else {
          console.error('Fetched data is not a valid object:', data);
        }
      })
      .catch(error => console.error('Error fetching party list:', error));
  }, []);

  return (
    <div className="dropdown-container">
      <select onChange={(e) => onPartySelect(e.target.value)}>
        <option value="">All Parties</option>
        {Object.keys(parties).map((party, index) => (
          <option key={index} value={party}>{party}</option>
        ))}
      </select>
    </div>
  );
};

export default PartyDropdown;
