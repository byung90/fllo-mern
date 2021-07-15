import React, { useState, useRef, useContext } from "react";
import UploadImageCard from "../components/UploadImageCard";
import { Alert, Button, Modal, Form, Row, Col } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";
import CompanyContext from "../utils/CompanyContext";
import SelectUSState from 'react-select-us-states';

const Add = () => {
  const authContext = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);
  const [alertShow, setAlertShow] = useState(false);
  const [propertyState, setPropertyState] = useState('');
  const history = useHistory();

  let addressOne = useRef({});
  let addressTwo = useRef({});
  let city = useRef({});
  let zipcode = useRef({});
  let propertyType = useRef({});
  let propertyClass = useRef({});
  let reason = useRef({});
  let ltv = useRef({});
  let loanType = useRef({});
  let expectedAmount = useRef({});


  const handlePropertyStateChange = (selectedState) => {
    setPropertyState(selectedState);
  }

  const createNewProperty = () => {
    const newProperty = {
      addressOne: addressOne.current.value,
      addressTwo: addressTwo.current.value,
      city: city.current.value,
      state: propertyState,
      zipcode: zipcode.current.value,
      propertyType: propertyType.current.value,
      propertyClass: propertyClass.current.value,
      propertyReason: reason.current.value,
      loanType: loanType.current.value,
      ltv: ltv.current.value,
      expectedAmount: expectedAmount.current.value,
      company: companyContext.companyId
    }

    API.createProperty(newProperty)
      .then(res => {
        console.log(res.data);
        setAlertShow(true);
      })
      .catch(err => console.log(err))
    console.log(newProperty);
  }

  const closeAlert = () => {
    setAlertShow(false);
    history.push("/listings");
  }

  return (
    <div>
      <Alert show={alertShow} variant="success">
        <Alert.Heading>Offer Successfully Made!</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => closeAlert()} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
      <nav className="navbar">
        <h2>Add New Listing</h2>
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
              <SelectUSState id="myId" className="form-control" onChange={handlePropertyStateChange} />
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
              <Form.Control as="select" ref={propertyType}>
                <option value="Commercial Housing">Commercial Housing</option>
                <option value="Hotel and Resort">Hotel and Resort</option>
                <option value="Land">Land</option>
                <option value="Commerical Building">Commerical Building</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Property Class</Form.Label>
              <Form.Control as="select" ref={propertyClass}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Loan Type</Form.Label>
              <Form.Control as="select" ref={loanType}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Reason</Form.Label>
              <Form.Control as="select" ref={reason}>
                <option value="Purchase">Purchase</option>
                <option value="Refinance">Refinance</option>
                <option value="Renovation">Renovation</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Loan to Value</Form.Label>
              <Form.Control type="number" placeholder="Control Loan Type" ref={ltv} />
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
          <button type="button" className="btn btn-primary" onClick={createNewProperty}>Submit</button>
        </div>
      </div>
    </div >
  )
};

export default Add;