import React, { useContext } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import API from "../../utils/API";
import AuthAPI from "../../utils/AuthAPI";
import CompanyContext from "../../utils/CompanyContext";
import BankContext from "../../utils/BankContext";
import './style.css';

const Header = () => {
  const authApi = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);
  const bankContext = useContext(BankContext);

  const logOut = () => {
    API.logout()
      .then(response => {
        authApi.setAuth(false);
        companyContext.setCompanyId();
        bankContext.setCompanyIsBank();
      })
  }

  function displayHeader() {
    return authApi.auth ? (
      <>
        <Container fluid className="globalHeader">
          <Row>
            <Col>
              <h3 className="p-2">Fllo</h3>
            </Col>
            <Col md="auto">
              <Row className="p-2">
                <Button className="p-2" onClick={logOut}>Log out</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </>)
      :
      <Container fluid>
        <Row className="justify-content-md-center globalHeader">
          <Col>
            <h3 className="p-2 align-center">Fllo</h3>
          </Col>
        </Row>
      </Container>
  }

  return (
    <>
      {displayHeader()}
    </>
  )
};

export default Header;