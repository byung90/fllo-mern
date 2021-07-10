import React from "react";
import UploadImageCard from "../components/UploadImageCard";

const Add = () => {
  return (
    <div>
      <nav className="navbar">
        Add New Listing
      </nav>
      <div className="container">
        <form>
          <h3>Basic Information</h3>
          <div className="row">
            <label htmlFor="newListingAddress" className="">Listing's Full Address</label>
            <div className="col-12">
              <input type="text" className="form-control" placeholder="Address 1" />
            </div>
            <div className="col-12">
              <input type="text" className="form-control" placeholder="Address 2" />
            </div>
            <div className="col-6">
              <input type="text" className="form-control" placeholder="City" />
            </div>
            <div className="col-6">
              <select className="form-select">
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
              </select>
            </div>
            <div className="col-6">
              <input type="text" className="form-control" placeholder="Zipcode" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="newListingPropertyType" className="">Property Type</label>
              <select className="form-select">
                <option>Property Type</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="newListingPropertyClass" className="">Property Class</label>
              <select className="form-select">
                <option>Select Property Class</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="newListingReason" className="">Reason</label>
              <select className="form-select">
                <option>Select Reason</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
              </select>
            </div>
          </div>
          <h3>Financial Information</h3>
          <div className="row">
            <div className="col-12">
              <label htmlFor="newListingLoanType" className="">Select Loan Type</label>
              <select className="form-select">
                <option>Select Loan Type</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
                <option>State</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="newListingLoanType" className="">Loan to Value</label>
              <input type="number" className="form-control" placeholder="Enter Value" />
            </div>
            <div className="col-6">
              <label htmlFor="newListingLoanType" className="">Select Loan Type</label>
              <input type="number" className="form-control" placeholder="City" />
            </div>
          </div>
        </form>
        <div className="property-photo-grid">
          <h3>Photo</h3>
          <UploadImageCard />
        </div>
        <div className="">
          <button type="button" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  )
};

export default Add;