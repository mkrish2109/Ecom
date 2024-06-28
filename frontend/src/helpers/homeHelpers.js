import {
  carouselKids,
  categoriesKids,
  trendingKidsProducts,
} from "../data/kids";
import { carouselMen, categoriesMen, trendingMenProducts } from "../data/men";
import {
  carouselWomen,
  categoriesWomen,
  trendingWomenProducts,
} from "../data/women";

export function getCarouselImages(gender) {
  if (!gender || gender === "men") {
    return carouselMen;
  }

  if (gender === "women") {
    return carouselWomen;
  }

  return carouselKids;
}

export function getTrendingProducts(gender) {
  if (!gender || gender === "men") {
    return trendingMenProducts;
  }

  if (gender === "women") {
    return trendingWomenProducts;
  }

  return trendingKidsProducts;
}

export function getCategories(gender) {
  if (!gender || gender === "men") {
    return categoriesMen;
  }

  if (gender === "women") {
    return categoriesWomen;
  }

  return categoriesKids;
}
