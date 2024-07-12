import { baseURL } from "../helpers/fetchHelper";
import { fetchHelper } from "../helpers/fetchHelper";

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

export { register, verifyEmail, login, logout, resetPassword, forgotPassword };
