import { Carousel } from "flowbite-react";
import React from "react";

function OfferCarousel({ images }) {
  return (
    <div className="h-[70vh]">
      <Carousel className="[&>div]:rounded-none" slideInterval={5000}>
        {images.map((img, index) => {
          return <img key={index} src={img} alt={""} />;
        })}
      </Carousel>
    </div>
  );
}

export default OfferCarousel;
