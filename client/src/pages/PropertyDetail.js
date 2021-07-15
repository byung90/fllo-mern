import React, { useState, useEffect, useRef, useContext } from "react";
import { Alert, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import AuthAPI from "../utils/AuthAPI";
import CompanyContext from "../utils/CompanyContext";
import BankContext from "../utils/BankContext";

const PropertyDetail = () => {
  const authApi = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);
  const bankContext = useContext(BankContext);
  console.log(authApi.auth);

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
      bank: companyContext.companyId
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

  function displayNav() {
    return !bankContext.companyIsBank ? (
      <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/listings/" + id}>
            Basic Info
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={{
            pathname: "/listings/" + id + "/offers",
            state: {
              property: property
            }
          }}>
            Offers
          </Link>
        </li>
      </>)
      :
      <li className="nav-item">
        <Button variant="primary" onClick={handleShow}>
          Make Offer
        </Button>
      </li>
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
        <Link to={"/listings"} >
          <button type="button" className="btn btn-primary">Back</button>
        </Link>
        <h2>{property.addressOne}, {property.city}, {property.state} {property.zipcode}</h2>
        <ul className="ms-auto nav">
          {
            displayNav()
          }
        </ul>
      </nav>
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
            <p>{property.propertyReason}</p>
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
                  <Form.Label className="offer-label">Loan Amout</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" placeholder="Enter Loan Amount" ref={offerLoanAmount} />
                  </InputGroup>

                </Col>
                <Col>
                  <Form.Label className="offer-label">Interest Rate</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" placeholder="Enter Interest Rate" ref={offerInterestRate} />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="offer-label">LTV</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" placeholder="Enter LTV" ref={offerLTV} />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label className="offer-label">Term</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" placeholder="Enter Term" ref={offerTerm} />
                    <InputGroup.Text>Years</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="offer-label">Amortization</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" placeholder="Enter Amortization" ref={offerAmortization} />
                    <InputGroup.Text>Years</InputGroup.Text>
                  </InputGroup>
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