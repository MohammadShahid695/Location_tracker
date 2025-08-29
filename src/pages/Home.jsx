import { useState } from "react";
export default function Home() {
  const [location, setLocation] = useState(null);
  const [shareLink, setShareLink] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lng: longitude });

      const res = await fetch("http://localhost:5000/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
      });
      const data = await res.json();
      setShareLink(data.link);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">📍 Location Tracker</h1>
      <button
        onClick={getLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Get My Location
      </button>

      {location && (
        <div className="mt-4 text-center">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          {shareLink && (
            <div className="mt-2">
              <p className="text-green-600 font-semibold">Share this link:</p>
              <a href={shareLink} className="text-blue-600 underline">{shareLink}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
