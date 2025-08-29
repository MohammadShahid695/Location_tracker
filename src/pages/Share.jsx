import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Share = () => {
  const [position, setPosition] = useState(null);

  // Geolocation fetch
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Error fetching location:", err);
        }
      );
    }
  }, []);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // ✅ from .env

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Share Location</h1>

      {position ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={15}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default Share;
