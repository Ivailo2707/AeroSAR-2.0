import { useEffect, useState } from "react";

export function Altimeter({ altitude = 8000 }) {
  // Convert altitude to needle positions
  const [needlePositions, setNeedlePositions] = useState({
    thousands: 0,
    hundreds: 0,
  });

  useEffect(() => {
    // Calculate needle positions based on altitude
    // Thousands hand does a full 360° rotation every 10,000 feet
    // Hundreds hand does a full 360° rotation every 1,000 feet
    const thousandsAngle = ((altitude / 10000) % 1) * 360;
    const hundredsAngle = ((altitude / 1000) % 1) * 360;

    setNeedlePositions({
      thousands: thousandsAngle,
      hundreds: hundredsAngle,
    });
  }, [altitude]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-2 text-lg font-bold">
        Altitude: {Math.round(altitude)} ft
      </div>
      <svg viewBox="0 0 300 300" className="w-64 h-64">
        {/* Outer bezel */}
        <path
          d="M 30,30 L 270,30 L 270,270 L 30,270 Z"
          fill="#333"
          stroke="#000"
          strokeWidth="4"
        />

        {/* Dial face */}
        <circle
          cx="150"
          cy="150"
          r="110"
          fill="#222"
          stroke="#444"
          strokeWidth="2"
        />

        {/* Markings */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * 36 * Math.PI) / 180;
          const x1 = 150 + 95 * Math.sin(angle);
          const y1 = 150 - 95 * Math.cos(angle);
          const x2 = 150 + 110 * Math.sin(angle);
          const y2 = 150 - 110 * Math.cos(angle);

          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="3"
              />
              <text
                x={150 + 80 * Math.sin(angle)}
                y={150 - 80 * Math.cos(angle) + 6}
                fill="white"
                fontSize="22"
                fontWeight="bold"
                textAnchor="middle"
              >
                {i}
              </text>
            </g>
          );
        })}

        {/* Small tick marks */}
        {[...Array(50)].map((_, i) => {
          if (i % 5 !== 0) {
            // Skip positions where we already have major ticks
            const angle = (i * 7.2 * Math.PI) / 180;
            const x1 = 150 + 100 * Math.sin(angle);
            const y1 = 150 - 100 * Math.cos(angle);
            const x2 = 150 + 110 * Math.sin(angle);
            const y2 = 150 - 110 * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="2"
              />
            );
          }
          return null;
        })}

        {/* ALT text */}
        <text
          x="150"
          y="100"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
        >
          ALT
        </text>

        {/* Striped indicator */}
        <path
          d="M 150,190 L 125,190 L 125,210 L 175,210 L 175,190 Z"
          fill="#222"
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="130"
          y1="195"
          x2="170"
          y2="195"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="130"
          y1="200"
          x2="170"
          y2="200"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="130"
          y1="205"
          x2="170"
          y2="205"
          stroke="white"
          strokeWidth="1.5"
        />

        {/* Digital counter window */}
        <rect
          x="195"
          y="140"
          width="45"
          height="20"
          fill="#222"
          stroke="white"
          strokeWidth="1"
          rx="2"
        />
        <text x="218" y="156" fill="white" fontSize="14" textAnchor="middle">
          {Math.floor(altitude / 100) / 10}
        </text>

        {/* Hour (thousands) hand */}
        <g transform={`rotate(${needlePositions.thousands}, 150, 150)`}>
          <path
            d="M 150,150 L 145,100 L 150,85 L 155,100 Z"
            fill="white"
            stroke="#333"
            strokeWidth="1"
          />
        </g>

        {/* Minute (hundreds) hand */}
        <g transform={`rotate(${needlePositions.hundreds}, 150, 150)`}>
          <path
            d="M 150,150 L 142,70 L 150,60 L 158,70 Z"
            fill="white"
            stroke="#333"
            strokeWidth="1"
          />
        </g>

        {/* Center cap */}
        <circle
          cx="150"
          cy="150"
          r="8"
          fill="#000"
          stroke="#444"
          strokeWidth="1"
        />

        {/* Corner screws */}
        <circle
          cx="45"
          cy="45"
          r="5"
          fill="#222"
          stroke="#111"
          strokeWidth="2"
        />
        <circle
          cx="255"
          cy="45"
          r="5"
          fill="#222"
          stroke="#111"
          strokeWidth="2"
        />
        <circle
          cx="45"
          cy="255"
          r="5"
          fill="#222"
          stroke="#111"
          strokeWidth="2"
        />
        <circle
          cx="255"
          cy="255"
          r="5"
          fill="#222"
          stroke="#111"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
