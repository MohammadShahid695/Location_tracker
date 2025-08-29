import React, { useEffect, useRef, useState } from "react";

export default function Share() {
  const mapRef = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location) => {
            const userPos = {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            };

            setPosition(userPos);

            const map = new window.google.maps.Map(mapRef.current, {
              center: userPos,
              zoom: 15,
            });

            new window.google.maps.Marker({
              position: userPos,
              map,
              title: "You are here!",
            });
          },
          () => {
            alert("Error: The Geolocation service failed.");
          }
        );
      } else {
        alert("Error: Your browser doesn’t support geolocation.");
      }
    };

    // Load Google Maps Script
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyClRdI8AUqJTx5IWmI55Fq1cSBYQbqee8M`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Live Location Tracker</h1>

      <div
        ref={mapRef}
        className="w-full max-w-2xl h-96 rounded-lg shadow-md border border-gray-300"
      />

      {position && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            📍 Your Location: <b>{position.lat}</b>, <b>{position.lng}</b>
          </p>
          <a
            href={`https://www.google.com/maps?q=${position.lat},${position.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
