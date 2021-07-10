import axios from "axios";

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
  createOffer
}