import React from "react";
import CategoryCard from "./CategoryCard";
import RowTitle from "../../comman/RowTitle";

function CategoriesRow({ categories }) {
  return (
    <div className="p-8">
      <RowTitle title="Shop by Category" />
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          return <CategoryCard category={category} />;
        })}
      </div>
    </div>
  );
}

export default CategoriesRow;
