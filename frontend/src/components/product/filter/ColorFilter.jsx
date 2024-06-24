import { Checkbox } from "flowbite-react";
import React from "react";

function ColorFilter({ title, colorName }) {
  return (
    <div className="px-8 pb-4 border border-t-gray-200">
      <h3 className="font-bold uppercase">{title}</h3>

      {colorName.map((value, i) => {
        return (
          <div className="flex gap-2 items-center" key={i}>
            <Checkbox />
            {console.log("value", value)}
            <div
              className="h-4 w-4 border-[red] rounded-full "
              style={{ backgroundColor: `${value}` }}></div>
            <p className="capitalize">{value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ColorFilter;
