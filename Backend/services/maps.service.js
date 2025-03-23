const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching coordinates from Google API");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.rows[0].elements[0];
    } else {
      throw new Error(
        `Unable to fetch distance and time: ${response.data.status}`
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching distance and time from Google API");
  }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&components=country:in&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions.map((prediction) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));
    } else {
      throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching suggestions from Google API");
  }
};

module.exports.getCaptainsInTheRadius = async (lng, ltd, radius) => {
  if (!ltd || !lng || !radius) {
    throw new Error("Latitude, longitude, and radius are required");
  }
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, ltd], radius / 6378], // radius in km ->> radius / 6378
        },
      },
    });

    return captains;  
}