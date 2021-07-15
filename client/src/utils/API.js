import axios from "axios";
axios.defaults.baseURL = '/';

const postLogin = (submitLogin) => {
  return axios.post("api/user/login", submitLogin);
}

const logout = () => {
  return axios.post("api/user/logout");
}

const createUser = () => {
  return axios.post("api/user/create");
}

const checkAuth = () => {
  return axios.get("api/user/checkAuth");
}

const getUser = (id) => {
  return axios.get("api/user/" + id);
}

const getAllCompanies = () => {
  return axios.post("api/company");
}

const getAllListings = () => {
  return axios.get("api/listings");
}

const getCompanyListings = (companyId) => {
  return axios.get("api/listings/" + companyId);
}

const getPropertyDetail = (propertyId) => {
  return axios.get("api/property/" + propertyId);
}

const getOffers = (propertyId) => {
  return axios.get("api/" + propertyId + "/offers");
}

const createOffer = (offerData) => {
  return axios.post("api/createOffer", offerData)
}

const createProperty = (propertyData) => {
  return axios.post("api/createProperty", propertyData)
}

const rejectAllOffers = (propertyId) => {
  return axios.put("api/" + propertyId + "/rejectAllOffers");
}

const acceptOffer = (propertyId) => {
  return axios.put("api/updateOffer/" + propertyId);
}

export default {
  getAllListings,
  getPropertyDetail,
  getOffers,
  createOffer,
  postLogin,
  createUser,
  getAllCompanies,
  checkAuth,
  getUser,
  logout,
  getCompanyListings,
  createProperty,
  rejectAllOffers,
  acceptOffer
}