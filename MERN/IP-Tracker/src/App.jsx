import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [ipData, setIpData] = useState({ ip: '', country: '' });

  useEffect(() => {
    // Fetch IP data from API
    axios.get('https://api.ipify.org?format=json').then((response) => {
      const ip = response.data.ip;
      // Fetch country data based on IP
      axios.get(`https://ipapi.co/${ip}/json/`).then((response) => {
          const country = response.data.country_name;
          setIpData({ ip, country });
        }).catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <div>
      <nav className="navbar">
        <h1>IP Tracker</h1>
        <div className="ip-info">
          <span>IP Address: {ipData.ip}</span>
          <span>Country: {ipData.country}</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
