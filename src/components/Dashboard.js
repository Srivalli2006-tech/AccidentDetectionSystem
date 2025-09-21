import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function Dashboard() {
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/accidents")
      .then(res => setAccidents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {accidents.map((a, index) => (
          <Marker key={index} position={[parseFloat(a.latitude), parseFloat(a.longitude)]}>
            <Popup>
              Accident at {a.latitude}, {a.longitude} <br />
              Time: {new Date(a.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Dashboard;
