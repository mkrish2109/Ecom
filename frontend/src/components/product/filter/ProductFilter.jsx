import { Checkbox } from "flowbite-react";
import React from "react";

function ProductFilter({ title, categories }) {
  return (
    <div className="px-8 pb-4 border border-t-gray-200 ">
      <h3 className="font-semibold uppercase py-4">{title}</h3>
      {categories.map((value, i) => {
        return (
          <div className="flex gap-2 items-center" key={i}>
            <Checkbox />
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ProductFilter;
