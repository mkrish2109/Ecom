import React from "react";

function ColorFilter({ color, colorName }) {
  return (
    <div className="flex items-center gap-1">
      <div
        className="w-[16px] h-[16px] rounded-full border"
        style={{
          backgroundColor: color,
        }}
      />
      <p>{colorName}</p>
    </div>
  );
}

export default ColorFilter;
