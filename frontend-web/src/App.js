import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/accidents") // Your backend API
      .then((res) => res.json())
      .then((data) => setAccidents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>Accidents Table & Map</h1>

      {/* Table */}
      <table
        border="1"
        style={{ margin: "20px auto", width: "80%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {accidents.map((acc) => (
            <tr key={acc._id}>
              <td>{acc.latitude}</td>
              <td>{acc.longitude}</td>
              <td>{new Date(acc.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Map */}
      <MapContainer
        center={[20, 77]} // Center of India
        zoom={5}
        style={{ height: "500px", width: "80%", margin: "auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {accidents.map((acc) => (
          <Marker
            key={acc._id}
            position={[parseFloat(acc.latitude), parseFloat(acc.longitude)]}
          >
            <Popup>
              Latitude: {acc.latitude} <br />
              Longitude: {acc.longitude} <br />
              Time: {new Date(acc.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
