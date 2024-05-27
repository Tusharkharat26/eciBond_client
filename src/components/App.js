// src/components/App.js
import React from 'react';
import '../App.css'; // Adjust the path to point to src/App.css
//import BarChart from './BarChart';
import PartyBarChart from './PartyBarChart'
//import PartyWiseDonation from './PartyWiseDonation';
import { useState } from 'react';



/*Company Funding*/
// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Company Funding Chart</h1>
//                 <BarChart />
//             </header>
//         </div>
//     );
// }


/*partywise donation*/
const App = () => {
    return (
      <div className="App">
        <h1>Party Funding Data</h1>
        <PartyBarChart />
      </div>
    );
  };
  

  // src/components/App.js
//companiwise donation for party
// const App = () => {
//   const [partyName, setPartyName] = useState('SIKKIM DEMOCRATIC FRONT');

//   const handlePartyNameChange = (event) => {
//     setPartyName(event.target.value);
//   };

//   return (
//     <div className="App">
//       <h1>Party-wise Donation Data</h1>
//       <input
//         type="text"
//         value={partyName}
//         onChange={handlePartyNameChange}
//         placeholder="Enter party name"
//       />
//       <PartyWiseDonation partyName={partyName} />
//     </div>
//   );
// };



 export default App;
