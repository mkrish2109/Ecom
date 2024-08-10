import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import RowTitle from "../../comman/RowTitle";
import TrendingCard from "./TrendingCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function TrendingRow({ products }) {
  if (!products) return null;
 
  return (
    <div className="w-full p-8">
      <RowTitle title="Trending" />
      {/* <Slider {...settings} className=""> */}
      <div className="overflow-x-auto flex items-center gap-2">
        {products.map((product) => {
          return <TrendingCard key={product.id} product={product} />;
        })}
      </div>
      {/* </Slider> */}
    </div>
  );
}

export default TrendingRow;
