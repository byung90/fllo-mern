import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Modal, Form, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

const PropertyDetail = () => {
  // Property Id
  const { id } = useParams();
  console.log(id);

  const [property, setProperty] = useState({});
  const [newOffer, setNewOffer] = useState({});
  const [alertShow, setAlertShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // New Offer
  let offerLoanAmount = useRef({});
  let offerInterestRate = useRef({});
  let offerLTV = useRef({});
  let offerTerm = useRef({});
  let offerAmortization = useRef({});

  // Modal
  const handleShow = () => setModalShow(true);
  const handleCancel = () => {
    setModalShow(false);
  }
  const handleClose = () => {
    const newOffer = {
      loanAmount: offerLoanAmount.current.value,
      interestRate: offerInterestRate.current.value,
      ltv: offerLTV.current.value,
      term: offerTerm.current.value,
      amortization: offerAmortization.current.value,
      status: "Pending",
      property: id,
      bank: "60e962ff9d68e91dec78a18a"
    }

    API.createOffer(newOffer)
      .then(res => {
        setNewOffer(res.data);
      })
      .catch(err => console.log(err))

    setAlertShow(true);
    setModalShow(false);
  }

  useEffect(() => {
    loadProperty();
  }, [newOffer]);

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
      <Alert show={alertShow} variant="success">
        <Alert.Heading>Offer Successfully Made!</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setAlertShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <nav className="navbar d-flex">
        <button type="button" className="btn btn-primary">Back</button>
        <h2>{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h2>
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

      <Modal show={modalShow} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Loan Amout</Form.Label>
                  <Form.Control type="number" placeholder="Enter Loan Amount" ref={offerLoanAmount} />
                </Col>
                <Col>
                  <Form.Label>Interest Rate</Form.Label>
                  <Form.Control type="number" placeholder="Enter Interest Rate" ref={offerInterestRate} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>LTV</Form.Label>
                  <Form.Control type="number" placeholder="Enter LTV" ref={offerLTV} />
                </Col>
                <Col>
                  <Form.Label>Term</Form.Label>
                  <Form.Control type="number" placeholder="Enter Term Years" ref={offerTerm} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Amortization</Form.Label>
                  <Form.Control type="number" placeholder="Enter Amortization Years" ref={offerAmortization} />
                </Col>
                <Col>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
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