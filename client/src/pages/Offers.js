import React, { useState, useEffect } from "react";
import BankOfferTableRow from "../components/BankOfferTableRow";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

const Offers = () => {
  // Property Id
  const propertyId = useParams().id;

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
  }, []);

  function loadOffers() {
    API.getOffers(propertyId)
      .then(res => {
        console.log(res.data);
        setOffers(res.data);
      })
      .catch(err => console.log(err));
  }

  const displayOffers = () => {
    offers.map(offer => (
      <BankOfferTableRow key={offer._id} {...offer} />
    ))
  }

  return (
    <>
      <nav className="navbar d-flex">
        <button type="button" className="btn btn-primary">Back</button>
        <h2>Building Address</h2>
        <ul className="ms-auto nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Basic Info</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Offers</a>
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
            <BankOfferTableRow key={offer._id} {...offer} />
          ))}
        </tbody>
      </table>
    </>
  )
};

export default Offers;