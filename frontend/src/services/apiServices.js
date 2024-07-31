import { baseURL, fetchHelper } from "../helpers/fetchHelper";

// Auth
function register(data) {
  return fetchHelper(`${baseURL}/auth/register`, "POST", data);
}

function verifyEmail(data) {
  return fetchHelper(`${baseURL}/auth/verify-email`, "POST", data);
}

function login(data) {
  return fetchHelper(`${baseURL}/auth/login`, "POST", data);
}

function logout() {
  return fetchHelper(`${baseURL}/auth/logout`);
}

function forgotPassword(data) {
  return fetchHelper(`${baseURL}/auth/forgot-password`, "POST", data);
}

function resetPassword(data) {
  return fetchHelper(`${baseURL}/auth/reset-password`, "POST", data);
}

// Products

function getAllProducts(filters = {}) {
  let queryStr = [];
  if (filters.gender) {
    queryStr.push(`gender=${filters.gender}`);
  }
  if (filters.category) {
    queryStr.push(`category=${filters.category}`);
  }
  return fetchHelper(`${baseURL}/products?${queryStr.join("&")}`);
}

function getTrendingProducts(slug) {
  return fetchHelper(`${baseURL}/products/trending/${slug}`);
}

function getSingleProduct(id) {
  return fetchHelper(`${baseURL}/products/${id}`);
}

async function addProduct(data) {
  const response = await fetch(`${baseURL}/products`, {
    body: data,
    method: "POST",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}

async function updateProduct(id, data) {
  const response = await fetch(`${baseURL}/products/${id}`, {
    body: data,
    method: "PATCH",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}

function deleteProduct(id) {
  return fetchHelper(`${baseURL}/products/${id}`, "DELETE");
}

// Pages

function getAllPages() {
  return fetchHelper(`${baseURL}/pages`);
}

function getSinglePage(id) {
  return fetchHelper(`${baseURL}/pages/${id}`);
}

async function addPage(data) {
  const response = await fetch(`${baseURL}/pages`, {
    body: data,
    method: "POST",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}

async function updatePage(id, data) {
  const response = await fetch(`${baseURL}/pages/${id}`, {
    body: data,
    method: "PATCH",
    credentials: "include",
  });
  const result = await response.json();
  return result;
}

function deletePage(id) {
  return fetchHelper(`${baseURL}/pages/${id}`, "DELETE");
}

export {
  register,
  verifyEmail,
  login,
  logout,
  resetPassword,
  forgotPassword,
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
  getTrendingProducts,
};