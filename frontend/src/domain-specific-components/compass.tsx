export const HeadingCompass = ({ heading }: { heading: number }) => {
  const getCompassDirection = (heading: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((heading % 360) / 45) % 8);
    return directions[index];
  };

  const direction = getCompassDirection(heading);

  return (
    <svg width="200" height="200" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="white"
        strokeWidth="2"
        fill="black"
      />
      <line
        x1="50"
        y1="50"
        x2={50 + 40 * Math.sin((heading * Math.PI) / 180)}
        y2={50 - 40 * Math.cos((heading * Math.PI) / 180)}
        stroke="red"
        strokeWidth="2"
      />
      <text x="50" y="15" fill="red" textAnchor="middle" fontSize="8">
        N
      </text>
      <text x="85" y="50" fill="red" textAnchor="middle" fontSize="8">
        E
      </text>
      <text x="50" y="85" fill="red" textAnchor="middle" fontSize="8">
        S
      </text>
      <text x="15" y="50" fill="red" textAnchor="middle" fontSize="8">
        W
      </text>
      <text x="50" y="80" fill="white" textAnchor="middle" fontSize="8">
        {Math.round(heading)}° {direction}
      </text>
    </svg>
  );
};
