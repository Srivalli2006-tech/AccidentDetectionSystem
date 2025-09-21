import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    // Fetch accidents from Web router
    axios.get('http://192.168.1.4:5000/api/web/accidents')
      .then(res => setAccidents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Accident Dashboard (Web)</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Time</th>
            <th>Google Maps</th>
          </tr>
        </thead>
        <tbody>
          {accidents.map((acc, index) => (
            <tr key={index}>
              <td>{acc.latitude}</td>
              <td>{acc.longitude}</td>
              <td>{new Date(acc.timestamp).toLocaleString()}</td>
              <td><a href={`https://www.google.com/maps?q=${acc.latitude},${acc.longitude}`} target="_blank" rel="noreferrer">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
