import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import AuthAPI from "../../utils/AuthAPI";
import CompanyContext from "../../utils/CompanyContext";

const PropertyCardContainer = () => {
  const [properties, setProperties] = useState([]);
  const [authMounted, setAuthMounted] = useState(false);
  const authApi = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);

  useEffect(() => {
    if (companyContext.companyId !== undefined && companyContext.companyIsBank !== undefined) {
      loadProperties();
    }
  }, []);

  function loadProperties() {
    // console.log(authApi);
    const companyId = companyContext.companyId;
    const companyIsBank = companyContext.companyIsBank;

    if (!companyIsBank) {
      API.getCompanyListings(companyId).then(res => {
        console.log(res);
        setProperties(prev => {
          return res.data;
        });
      })
    }
    else {
      API.getAllListings().then(res => {
        setProperties(prev => {
          console.log(prev);
          return res.data;
        });
      });
    }




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
              <h5 className="card-title">{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h5>
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