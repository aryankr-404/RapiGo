import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 28.7041, lng: 77.1025 }; // Default: New Delhi

const LiveTracking = () => {
  const [location, setLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [error, setError] = useState(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Initial location fetch
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setMapCenter(newLocation);
        },
        (error) => setError(error.message),
        { enableHighAccuracy: true }
      );

      // Update location every 5 seconds
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(newLocation);
            setMapCenter(newLocation);
          },
          (error) => setError(error.message),
          { enableHighAccuracy: true }
        );
      }, 5000);

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded) return <div>Loading Maps...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={mapCenter}>
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default LiveTracking;
