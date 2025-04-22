import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { SquareGrid } from "./domain-specific-components/thermo";
import { ArtificialHorizon } from "./domain-specific-components/horizon";
import { Altimeter } from "./domain-specific-components/alt-meter";
import { LeafletMap } from "./domain-specific-components/map";
import { HeadingCompass } from "./domain-specific-components/compass";

// Small display gauge
const SvgGauge = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="flex flex-col items-center text-green-400 bg-gray-900 p-4 rounded-xl shadow-md w-40 h-32">
    <h3 className="text-sm font-bold mb-1">{label}</h3>
    <div className="text-xl font-mono">
      {value} {unit}
    </div>
  </div>
);

// Main Panel
const CockpitPanel = () => {
  const [data, setData] = useState({
    gps: {
      latitude: 77.981888,
      longitude: 108.51287,
    },
    gyro: {
      pitch: 5.04,
      roll: 15.6,
    },
    altitude: 300.04,
    speed: 125.2,
    heading: 348,
    verticalSpeed: 2.1,
    fuel: 45.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => ({
        gps: {
          latitude: prevData.gps.latitude + (Math.random() * 0.001 - 0.0005),
          longitude: prevData.gps.longitude + (Math.random() * 0.001 - 0.0005),
        },
        gyro: {
          pitch: Math.max(
            -30,
            Math.min(30, prevData.gyro.pitch + (Math.random() * 2 - 1)),
          ),
          roll: (prevData.gyro.roll + (Math.random() * 4 - 2)) % 360,
        },
        altitude: Math.max(0, prevData.altitude + (Math.random() * 2 - 1)),
        speed: Math.max(0, prevData.speed + (Math.random() * 2 - 1)),
        heading: Math.round((prevData.heading + (Math.random() * 4 - 2)) % 360),
        verticalSpeed: Math.max(
          -5,
          Math.min(5, prevData.verticalSpeed + (Math.random() * 1 - 0.5)),
        ),
        fuel: Math.max(0, prevData.fuel - 0.01),
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6 grid grid-cols-3 gap-6">
      <SvgGauge label="Latitude" value={data.gps.latitude.toFixed(5)} />
      <SvgGauge label="Longitude" value={data.gps.longitude.toFixed(5)} />
      <SvgGauge label="Speed" value={data.speed.toFixed(1)} unit="kts" />
      <SvgGauge
        label="GSpeed"
        value={data.verticalSpeed.toFixed(1)}
        unit="m/s"
      />
      <SvgGauge label="Fuel" value={data.fuel.toFixed(1)} unit="%" />

      <div className="col-span-1">
        <h2 className="text-lg mb-2 text-center text-green-400">
          Artificial Horizon
        </h2>
        <ArtificialHorizon pitch={data.gyro.pitch} roll={data.gyro.roll} />
      </div>

      <div className="col-span-1">
        <h2 className="text-lg mb-2 text-center text-green-400">
          Altitude Meter
        </h2>
        <Altimeter altitude={data.altitude} />
      </div>
      <LeafletMap />
      <div className="col-span-1">
        <h2 className="text-lg mb-2 text-center text-green-400">
          Heading Indicator
        </h2>
        <HeadingCompass heading={data.heading} />
      </div>
      <SquareGrid
        values={Array.from({ length: 64 }, () => {
          return Math.floor(Math.random() * 100) + 1;
        })}
      />
    </div>
  );
};

export default CockpitPanel;
