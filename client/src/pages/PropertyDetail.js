import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

const PropertyDetail = () => {
  // Property Id
  const { id } = useParams();
  console.log(id);

  // Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [property, setProperty] = useState([]);

  useEffect(() => {
    loadProperty();
  }, []);

  function loadProperty() {
    API.getPropertyDetail(id)
      .then(res => {
        console.log(res.data);
        setProperty(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <nav className="navbar d-flex">
        <button type="button" className="btn btn-primary">Back</button>
        <h2>Building Address</h2>
        <ul className="ms-auto nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Basic Info</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={"/listings/" + id + "/offers"}>Offers</a>
          </li>
          <li className="nav-item">
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
          </li>
        </ul>
      </nav>
      <div className="property-detail-photo-container">
        <div className="container">
          <img src="..." alt="..." />
        </div>
      </div>
      <div className="basic-info-container container">
        <div className="row">
          <div className="col-6">
            <h6 className="header">Property Type</h6>
            <p>{property.propertyType}</p>
          </div>
          <div className="col-6">
            <h6 className="header">Property Class</h6>
            <p>{property.propertyClass}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h6 className="header">Loan Type</h6>
            <p>{property.loanType}</p>
          </div>
          <div className="col-6">
            <h6 className="header">Loan To Value</h6>
            <p>{property.ltv}%</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h6 className="header">Reason</h6>
            <p>{property.reason}</p>
          </div>
          <div className="col-6">
            <h6 className="header">Expected Amount</h6>
            <p>${property.expectedAmount}</p>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Loan Amout</Form.Label>
                  <Form.Control type="number" placeholder="Enter Loan Amount" />
                </Col>
                <Col>
                  <Form.Label>Interest Rate</Form.Label>
                  <Form.Control type="number" placeholder="Enter Interest Rate" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>LTV</Form.Label>
                  <Form.Control type="number" placeholder="Enter LTV" />
                </Col>
                <Col>
                  <Form.Label>Term</Form.Label>
                  <Form.Control type="number" placeholder="Enter Term Years" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Amortization</Form.Label>
                  <Form.Control type="number" placeholder="Enter Amortization Years" />
                </Col>
                <Col>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Finalize Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default PropertyDetail;