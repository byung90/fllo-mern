import axios from "axios";

const postLogin = (submitLogin) => {
  return axios.post("http://localhost:3001/api/user/login", submitLogin);
}

const createUser = () => {
  return axios.post("http://localhost:3001/api/user/create");
}

const checkAuth = () => {
  return axios.get("http://localhost:3001/api/user/checkAuth");
}

const getAllCompanies = () => {
  return axios.post("http://localhost:3001/api/company");
}

const getAllListings = () => {
  return axios.get("http://localhost:3001/api/listings");
}

const getPropertyDetail = (propertyId) => {
  return axios.get("http://localhost:3001/api/property/" + propertyId);
}

const getOffers = (propertyId) => {
  return axios.get("http://localhost:3001/api/" + propertyId + "/offers");
}

const createOffer = (offerData) => {
  return axios.post("http://localhost:3001/api/createOffer", offerData)
}

export default {
  getAllListings,
  getPropertyDetail,
  getOffers,
  createOffer,
  postLogin,
  createUser,
  getAllCompanies,
  checkAuth
}