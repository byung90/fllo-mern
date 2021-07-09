import React from "react";
import PropertyContainer from "../components/PropertyContainer";

const Listings = () => {
  return (
    <>
      <nav className="navbar d-flex">
        <h2>All listings</h2>
        <div className="ms-auto">
          Add New Property
        </div>
      </nav>
      <PropertyContainer />
    </>
  )
};

export default Listings;