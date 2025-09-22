// frontend-web/src/api.js
import axios from "axios";

export const fetchAccidents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/accidents");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
