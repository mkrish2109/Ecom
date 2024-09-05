import { baseURL, fetchHelper } from "../helpers/fetchHelper";

// User
export function getAllUsers() {
  return fetchHelper(`${baseURL}/users`);
}

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

//WhishList
export function getAllWhishList() {
  return fetchHelper(`${baseURL}/whishList`);
}

export function addWhishList(id) {
  return fetchHelper(`${baseURL}/whishList/${id}`, "POST");
}

export function deleteWhishList(id) {
  return fetchHelper(`${baseURL}/whishList/${id}`, "DELETE");
}

// Orders
export function createOrder(data) {
  return fetchHelper(`${baseURL}/orders`, "POST", data);
}

export function updateOrder(id, data) {
  return fetchHelper(`${baseURL}/orders/${id}`, "PATCH", data);
}

export function updateOrderStatus(id, data) {
  return fetchHelper(`${baseURL}/orders/updateStatus/${id}`, "PATCH", data);
}

export function getAllOrders() {
  return fetchHelper(`${baseURL}/orders`);
}

export function getUserOrders() {
  return fetchHelper(`${baseURL}/orders/showAllMyOrders`);
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
