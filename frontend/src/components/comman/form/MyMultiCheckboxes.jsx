import { Checkbox, Label } from "flowbite-react";
import React from "react";

function MyMultiCheckboxes({ label, options, className }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex gap-3 flex-wrap">
        {options.map((value, index) => {
          return (
            <div className="flex items-center gap-1" key={index}>
              <Checkbox id={value.name} name={value.name} />
              <Label htmlFor={value.name} className={className}>
                {value.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyMultiCheckboxes;
