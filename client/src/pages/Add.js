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
  let expectedAmount = useRef({});

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
              <Form.Select placeholder="Select State" ref={propertyState}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control type="number" placeholder="Enter Zipcode" ref={zipcode} />
            </Col>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Property Type</Form.Label>
              <Form.Select placeholder="Select Property Type" ref={propertyType}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Property Class</Form.Label>
              <Form.Select placeholder="Select Property Class" ref={propertyClass}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Loan Type</Form.Label>
              <Form.Select placeholder="Select Loan Type" ref={loanType}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Reason</Form.Label>
              <Form.Select placeholder="Select Property Class" ref={reason}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Loan to Value</Form.Label>
              <Form.Control type="number" placeholder="Select Loan Type" ref={ltv} />
            </Col>
            <Col>
              <Form.Label>Expected Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter Expected Amount" ref={expectedAmount} />
            </Col>
          </Row>
        </Form>
        <div className="property-photo-grid">
          <h3>Photo</h3>
          <UploadImageCard />
        </div>
        <div className="">
          <button type="button" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div >
  )
};

export default Add;