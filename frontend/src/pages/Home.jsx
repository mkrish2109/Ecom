import React, { useEffect, useState } from "react";
import OfferCarousel from "../components/home/OfferCarousel";
import TrendingRow from "../components/home/tandingRow/TandingRow";
import { useParams } from "react-router-dom";
import CategoriesRow from "../components/home/categorieRow/CategoriesRow";
import { getSinglePage, getTrendingProducts } from "../services/apiServices";

function Home() {
  const params = useParams();
  const [page, setPage] = useState(null);
  const [trendingProducts, setTrendingProducts] = useState(null);
  console.log("params", params);
  useEffect(() => {
    getSinglePage(params.gender).then((data) => {
      setPage(data?.data);
      console.log("page", page);
    });
  }, [params]);
  useEffect(() => {
    getTrendingProducts(params.gender).then((data) => {
      setTrendingProducts(data?.data);
    });
  }, [params]);

  if (!page) return null;

  return (
    <>
      <OfferCarousel images={page.carouselImages} />
      <TrendingRow products={trendingProducts} />
      <CategoriesRow categories={page.categories} />
    </>
  );
}

export default Home;
