import React, { useState, useEffect, useContext } from "react";
import BankOfferTableRow from "../components/BankOfferTableRow";
import { Link, useParams, useLocation } from "react-router-dom";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";

const Offers = () => {
  const authApi = useContext(AuthAPI);
  // Property Id
  const propertyId = useParams().id;
  const location = useLocation();
  const { property } = location.state;

  const [offers, setOffers] = useState([]);
  const [offerStatus, setOfferStatus] = useState(false);


  useEffect(() => {
    loadOffers();
  }, [offerStatus]);

  function loadOffers() {
    API.getOffers(propertyId)
      .then(res => {
        console.log(res.data);
        setOffers(res.data);
      })
      .catch(err => console.log(err));
  }

  function handleOfferStatus(newValue) {
    setOfferStatus(newValue);
  }

  return (
    <>
      <nav className="navbar d-flex">
        <Link to={"/listings"} >
          <button type="button" className="btn btn-primary">Back</button>
        </Link>
        <h2>{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h2>
        <ul className="ms-auto nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/listings/" + propertyId}>
              Basic Info
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/listings/" + propertyId + "/offers"}>
              Offers
            </Link>
          </li>
        </ul>
      </nav>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Bank</th>
            <th scope="col">Loan Amount</th>
            <th scope="col">Interest Rate</th>
            <th scope="col">LTV</th>
            <th scope="col">Term</th>
            <th scope="col">Amortization</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {offers.map(offer => (
            <BankOfferTableRow key={offer._id} {...offer} value={offerStatus} onChange={handleOfferStatus} />
          ))}
        </tbody>
      </table>
    </>
  )
};

export default Offers;