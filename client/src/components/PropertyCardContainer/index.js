import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import CompanyContext from "../../utils/CompanyContext";
import BankContext from "../../utils/BankContext";
import { CardGroup, Card } from "react-bootstrap";
import "./style.css";

const PropertyCardContainer = () => {
  const [properties, setProperties] = useState([]);
  // const authApi = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);
  const bankContext = useContext(BankContext);

  useEffect(() => {
    if (companyContext.companyId !== undefined && bankContext.companyIsBank !== undefined) {
      loadProperties();
      console.log(properties);
    }
  }, [companyContext.companyId, bankContext.companyIsBank]);

  function loadProperties() {
    const companyId = companyContext.companyId;
    const companyIsBank = bankContext.companyIsBank;
    console.log(companyId);

    if (!companyIsBank) {
      API.getCompanyListings(companyId).then(res => {
        setProperties(prev => {
          return res.data;
        });
      })
    }
    else {
      API.getAllListings().then(res => {
        console.log(res.data);
        setProperties(prev => {
          console.log(prev);
          return res.data;
        });
      });
    }
  }

  return (
    <div className="property-list-container d-flex flex-wrap">
      {properties.map(property => (
        <div className="col-4" key={property._id}>
          <div className="card">
            <div className="card-body">
              <Link to={"/listings/" + property._id}>
                <h4 className="card-title">{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h4>
              </Link>
              <p className="card-text">
                <span className="bold-text">Property Type:</span> {property.propertyType}
                <br />
                <span className="bold-text">Class:</span> {property.propertyClass}
                Loan Type: {property.loanType}
                <br />
              </p>
              <p className="card-text">
                <span className="bold-text">LTV:</span> {property.ltv}%
                <br />
                <span className="bold-text">Loan Amount:</span> ${property.expectedAmount}
              </p>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default PropertyCardContainer;