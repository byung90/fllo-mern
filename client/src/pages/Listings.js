import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropertyCardContainer from "../components/PropertyCardContainer";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";

const Listings = () => {
  return (
    <>
      <nav className="navbar d-flex">
        <h2>All listings</h2>
        <Link to={"/add"} className="ms-auto">
          <Button variant="primary">Add New Property</Button>
        </Link>
      </nav>
      <PropertyCardContainer />
    </>
  )
};

export default Listings;