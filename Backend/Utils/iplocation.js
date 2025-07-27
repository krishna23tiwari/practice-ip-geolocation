const axios = require("axios");

const getLocationFromIP = async (ip) => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, regionName, city } = response.data;
    return {
      country: country || "Unknown",
      region: regionName || "Unknown",
      city: city || "Unknown",
    };
  } catch (err) {
    console.error("Error fetching location:", err.message);
    return {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
    };
  }
};

module.exports = { getLocationFromIP };
