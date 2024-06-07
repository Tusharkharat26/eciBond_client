/*company Funding fetch*/
// export function getCompanyFunding() {
//   return fetch('http://localhost:9898/api/companyFunding')
//     .then(res => res.json())
//     .catch(error => console.log('Error fetching company funding data:', error));
// }

/*Party Funding Fetching*/
// export function getpartyFunding() {
//   return fetch('http://localhost:9898/api/partyFunding')
//     .then(res => res.json())
//     .catch(error => console.log('Error fetching party funding data:', error));
// }
//src/api/api.js
export function getPartywiseDonation(partyName) {
  return fetch(`http://localhost:9898/api/partywiseDonation?partyName=${encodeURIComponent(partyName)}`)
    .then(res => res.json())
    .catch(error => console.error('Error fetching party-wise donation data:', error));
}
export function getPartyList() {
  return fetch('http://localhost:9898/api/partyList')
    .then(res => res.json())
    
    .catch(error => {
      console.error('Error fetching party list:', error);
      
    });
}

