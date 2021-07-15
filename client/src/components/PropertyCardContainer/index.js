import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import CompanyContext from "../../utils/CompanyContext";
import BankContext from "../../utils/BankContext";

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
    <div className="d-flex flex-wrap">
      {properties.map(property => (
        <div className="card col-3" key={property._id}>
          <Link to={"/listings/" + property._id}>
            <img src="..." className="card-img-top" alt="..." />
          </Link>

          <div className="card-body">
            <Link to={"/listings/" + property._id}>
              <h5 className="card-title">{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h5>
            </Link>
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