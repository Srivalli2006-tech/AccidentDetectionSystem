import React from "react";

const AccidentTable = ({ accidents, onView }) => {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Vehicle Number</th>
          <th>Location</th>
          <th>Severity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {accidents.map((accident) => (
          <tr key={accident._id}>
            <td>{accident.vehicleNumber}</td>
            <td>{accident.location}</td>
            <td>{accident.severity}</td>
            <td>
              <button onClick={() => onView(accident)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccidentTable;

