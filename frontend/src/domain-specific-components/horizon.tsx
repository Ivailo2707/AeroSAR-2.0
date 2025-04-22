export const ArtificialHorizon = ({
  pitch = 0,
  roll = 0,
}: {
  pitch: number;
  roll: number;
}) => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <clipPath id="circleClip">
        <circle cx="100" cy="100" r="95" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleClip)">
      <g transform={`rotate(${roll}, 100, 100)`}>
        <g transform={`translate(0, ${pitch * 2})`}>
          <rect x="0" y="0" width="200" height="100" fill="#4682B4" />
          <rect x="0" y="100" width="200" height="100" fill="#8B4513" />
          {[...Array(9)].map((_, i) => {
            const offset = (i - 4) * 10;
            if (offset === 0) return null;
            return (
              <g key={i}>
                <line
                  x1="70"
                  x2="130"
                  y1={100 + offset * 2}
                  y2={100 + offset * 2}
                  stroke="white"
                  strokeWidth="1"
                />
                <text
                  x="60"
                  y={104 + offset * 2}
                  fontSize="6"
                  fill="white"
                  textAnchor="end"
                >
                  {Math.abs(offset * -1)}
                </text>
                <text x="140" y={104 + offset * 2} fontSize="6" fill="white">
                  {Math.abs(offset * -1)}
                </text>
              </g>
            );
          })}
        </g>
      </g>
      <line
        x1="60"
        y1="100"
        x2="140"
        y2="100"
        stroke="yellow"
        strokeWidth="3"
      />
      <polygon points="95,98 105,98 100,103" fill="yellow" />
    </g>
    <circle
      cx="100"
      cy="100"
      r="95"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    {[...Array(36)].map((_, i) => {
      const angle = i * 10 - 90;
      const isMajor = i % 3 === 0;
      const length = isMajor ? 10 : 5;
      const x1 = 100 + (95 - length) * Math.cos((angle * Math.PI) / 180);
      const y1 = 100 + (95 - length) * Math.sin((angle * Math.PI) / 180);
      const x2 = 100 + 95 * Math.cos((angle * Math.PI) / 180);
      const y2 = 100 + 95 * Math.sin((angle * Math.PI) / 180);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth={isMajor ? 2 : 1}
        />
      );
    })}
    <polygon points="100,10 95,25 105,25" fill="white" />
  </svg>
);
