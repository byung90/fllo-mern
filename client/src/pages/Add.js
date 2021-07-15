import React, { useState, useRef, useContext } from "react";
import UploadImageCard from "../components/UploadImageCard";
import { Alert, Button, Modal, Form, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";
import CompanyContext from "../utils/CompanyContext";

const Add = () => {
  const authContext = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);

  const [newProperty, setNewProperty] = useState({});
  let addressOne = useRef({});
  let addressTwo = useRef({});
  let city = useRef({});
  let propertyState = useRef({});
  let zipcode = useRef({});
  let propertyType = useRef({});
  let propertyClass = useRef({});
  let reason = useRef({});
  let ltv = useRef({});
  let loanType = useRef({});

  return (
    <div>
      <nav className="navbar">
        Add New Listing
      </nav>
      <div className="container">
        <Form>
          <h3>Basic Information</h3>
          <Row>
            <Col>
              <Form.Label>Address One</Form.Label>
              <Form.Control type="text" placeholder="Enter Address 1" ref={addressOne} />
            </Col>
            <Col>
              <Form.Label>Address Two</Form.Label>
              <Form.Control type="text" placeholder="Enter Address 2" ref={addressTwo} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" ref={city} />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Select State" ref={propertyState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control type="text" placeholder="Enter Zipcode" ref={zipcode} />
            </Col>
            <Col>

            </Col>
          </Row>
        </Form>
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
              <label htmlFor="newListingExpected" className="">Expected Amount</label>
              <input type="number" className="form-control" placeholder="Enter Expected Amount" />
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