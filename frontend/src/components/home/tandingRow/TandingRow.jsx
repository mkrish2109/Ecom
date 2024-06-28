import React from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TrendingCard from "./TrendingCard";
import Slider from "react-slick";
import RowTitle from "../../comman/RowTitle";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function TrendingRow({ products }) {
  return (
    <div className="w-full p-8">
      <RowTitle title="Trending" />
      <Slider {...settings} className="">
        {products.map((product) => {
          return <TrendingCard key={product.id} product={product} />;
        })}
      </Slider>
    </div>
  );
}

export default TrendingRow;
