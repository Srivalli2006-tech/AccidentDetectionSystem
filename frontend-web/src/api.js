// src/api.js
export const fetchAccidents = async () => {
  // Simulate API response
  return [
    { id: 1, latitude: 17.385044, longitude: 78.486671, description: "Minor accident at location A" },
    { id: 2, latitude: 17.450000, longitude: 78.500000, description: "Major accident at location B" },
  ];
};
