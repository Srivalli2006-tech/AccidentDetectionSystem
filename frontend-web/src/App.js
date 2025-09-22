import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchAccidents } from "./api";
import Barcode from "./components/Barcode";
import "./App.css";
import "leaflet/dist/leaflet.css";

// Marker component with popup containing QR code
const MarkerWithPopup = React.forwardRef(({ accident }, ref) => {
  return (
    <Marker
      position={[accident.latitude, accident.longitude]}
      ref={ref}
    >
      <Popup>
        <strong>{accident.description}</strong>
        <div style={{ marginTop: "10px" }}>
          <Barcode value={accident.description} />
        </div>
      </Popup>
    </Marker>
  );
});

function App() {
  const [accidents, setAccidents] = useState([]);
  const markerRefs = useRef({}); // Store refs for each marker
  const [map, setMap] = useState(null); // Store map instance

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAccidents();
      setAccidents(data);
    };
    getData();
  }, []);

  // Handle table "View" click
  const handleViewClick = (accident) => {
    const marker = markerRefs.current[accident.id];
    if (marker && map) {
      // Zoom into the exact accident location
      map.setView([accident.latitude, accident.longitude], 16);
      // Open marker popup with QR code
      marker.openPopup?.();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Accident Detection System</h1>
      </header>

      {/* Map Section */}
      <div className="map-container">
        <MapContainer
          center={[17.385044, 78.486671]}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {accidents.map((accident) => (
            <MarkerWithPopup
              key={accident.id}
              accident={accident}
              ref={(el) => (markerRefs.current[accident.id] = el)}
            />
          ))}
        </MapContainer>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <h2>Accident Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {accidents.map((accident) => (
              <tr key={accident.id}>
                <td>{accident.id}</td>
                <td>{accident.description}</td>
                <td>{accident.latitude}</td>
                <td>{accident.longitude}</td>
                <td>
                  <button onClick={() => handleViewClick(accident)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
