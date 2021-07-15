import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropertyCardContainer from "../components/PropertyCardContainer";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";
import BankContext from "../utils/BankContext";

const Listings = () => {
  const bankContext = useContext(BankContext);

  const addPropertyButton = () => {
    return (
      !bankContext.companyIsBank ? <Link to={"/add"} className="ms-auto">
        <Button variant="primary">Add New Property</Button>
      </Link> : <></>
    )
  }

  return (
    <>
      <nav className="navbar d-flex">
        <h2>All listings</h2>
        {
          addPropertyButton()
        }
      </nav>
      <PropertyCardContainer />
    </>
  )
};

export default Listings;