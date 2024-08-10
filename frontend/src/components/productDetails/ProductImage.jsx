import React from "react";

function ProductImage({ images }) {

  return (
    <div className="grid grid-cols-2 gap-4 ">
      {images.map((image, index) => {
        return (
          <div key={index} className=" overflow-hidden border">
            <img src={image} alt="" className="h-full w-full object-cover" />;
          </div>
        );
      })}
    </div>
  );
}

export default ProductImage;
