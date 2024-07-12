import React from "react";
import OfferCarousel from "../components/home/OfferCarousel";
import TrendingRow from "../components/home/tandingRow/TandingRow";
import { useParams } from "react-router-dom";
import {
  getCarouselImages,
  getCategories,
  getTrendingProducts,
} from "../helpers/homeHelpers";
import CategoriesRow from "../components/home/categorieRow/CategoriesRow";

function Home() {
  const params = useParams();

  const carouselImages = getCarouselImages(params.gender);
  const trendingProducts = getTrendingProducts(params.gender);
  const categories = getCategories(params.gender);
  return (
    <>
      <OfferCarousel images={carouselImages} />
      <TrendingRow products={trendingProducts} />
      <CategoriesRow categories={categories} />
    </>
  );
}

export default Home;
