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
       <span>{colorName}</span>
    </div>
  );
}

export default ColorFilter;
