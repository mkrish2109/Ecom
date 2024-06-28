import React from "react";
import ProductFilter from "./filter/ProductFilter";
import ColorFilter from "./filter/ColorFilter";
import { clothesColors } from "../../data/productList";

function Filter() {
  return (
    <>
      {/* Categories */}
      <ProductFilter
        title="Categories"
        categories={["TShirt", "Lounge Tshirts"]}
      />

      {/* Band */}
      <ProductFilter
        title="BRAND"
        categories={[
          "UrbanThreads",
          "CottonCanvas",
          "InkSplash",
          "ThreadCraft",
          "DesignDrape",
          "StitchStreet",
          "FabricFusion",
        ]}
      />

      {/* Price */}
      <ProductFilter
        title="Price"
        categories={[
          "Rs. 155 to Rs. 13867",
          "Rs. 13867 to Rs. 27579",
          "Rs. 27579 to Rs. 41291",
          "Rs. 41291 to Rs. 55003",
        ]}
      />

      {/* Color */}
      <ProductFilter
        title="Color"
        categories={clothesColors.map((color) => {
          return (
            <ColorFilter color={color.color} colorName={color.colorName} />
          );
        })}
      />
    </>
  );
}

export default Filter;
