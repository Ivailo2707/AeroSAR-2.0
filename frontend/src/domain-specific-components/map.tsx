import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export const FollowMarker = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), {
      animate: true,
    });
  }, [position, map]);
  return null;
};

export const LeafletMap = () => {
  const [position, setPosition] = useState<[number, number]>([
    42.698334, 23.319941,
  ]); // Sofia

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(([lat, lng]) => [
        lat + (Math.random() - 0.5) * 0.001,
        lng + (Math.random() - 0.5) * 0.001,
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={17}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={position} />
      <FollowMarker position={position} />
    </MapContainer>
  );
};

// Define map container style
const containerStyle = {
  width: "100%",
  height: "500px",
};
