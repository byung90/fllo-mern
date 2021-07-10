import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

const PropertyCardContainer = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  }, []);

  function loadProperties() {
    API.getAllListings()
      .then(res => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="d-flex flex-wrap">
      {properties.map(property => (
        <div className="card col-3" key={property._id}>
          <Link to={"/listings/" + property._id}>
            <img src="..." className="card-img-top" alt="..." />
          </Link>

          <div className="card-body">
            <a href={"/listings/" + property._id}>
              <h5 className="card-title">{property.addressOne}, {property.city}, {property.state} {property.zipcoe}</h5>
            </a>
            <p className="card-text">
              LTV: {property.ltv}
              <br />
              Expected Amount: {property.expectedAmount}
            </p>

            <p className="card-text">
              {property.propertyType} / {property.propertyClass}
              <br />
              Loan Type: {property.loanType}
              <br />
              Property Type: {property.propertyType}
            </p>

          </div>

        </div>
      ))
      }
    </div >
  );
};

export default PropertyCardContainer;