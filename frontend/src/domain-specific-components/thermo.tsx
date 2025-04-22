import React from "react";

export type SquareProps = {
  value: number;
};

export const Square: React.FC<SquareProps> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(1, value));
  const red = Math.floor((clampedValue / 100) * 255);
  const blue = 255 - red;

  const color = `rgb(${red}, 0, ${blue})`;

  return (
    <div
      className="w-10 h-10"
      style={{
        backgroundColor: color,
        border: "1px solid #333",
      }}
    />
  );
};

type GridProps = {
  values: number[];
};

export const SquareGrid: React.FC<GridProps> = ({ values }) => {
  if (values.length !== 64) {
    return <div>Error: Grid requires exactly 64 values.</div>;
  }

  return (
    <div className="grid grid-cols-8 gap-1">
      {values.map((val, idx) => (
        <Square key={idx} value={val} />
      ))}
    </div>
  );
};
