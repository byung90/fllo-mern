import React, { useState, useEffect } from "react";
import PropertyCardContainer from "../components/PropertyCardContainer";
import API from "../utils/API";

const Listings = () => {

  return (
    <>
      <nav className="navbar d-flex">
        <h2>All listings</h2>
        <div className="ms-auto">
          Add New Property
        </div>
      </nav>
      <PropertyCardContainer />
    </>
  )
};

export default Listings;