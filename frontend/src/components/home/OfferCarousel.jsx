import { Carousel } from "flowbite-react";
import React from "react";

function OfferCarousel({images}) {
  return (
    <div className="h-[70vh]">
      <Carousel className="[&>div]:rounded-none" slideInterval={5000}>
        {images.map((img) => {
          return <img src={img.url} alt={img.alt} />;
        })}
      </Carousel>
    </div>
  );
}

export default OfferCarousel;
