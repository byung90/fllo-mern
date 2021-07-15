import React, { useState, useEffect, useRef, useContext } from "react";
import API from "../utils/API";
import { Form, Button } from "react-bootstrap";
import AuthAPI from "../utils/AuthAPI";
import CompanyContext from "../utils/CompanyContext";
import BankContext from "../utils/BankContext";

const Login = () => {
  const authApi = useContext(AuthAPI);
  const companyContext = useContext(CompanyContext);
  const bankContext = useContext(BankContext);
  const [userInfo, setUserInfo] = useState({});
  let email = useRef({});
  let password = useRef({});

  function submitLogin(e) {
    const loginBody = {
      email: email.current.value,
      password: password.current.value
    }

    API.postLogin(loginBody)
      .then(res => {
        console.log(res.data);
        const userData = res.data;
        authApi.setAuth(userData.auth);
        // setUserId(userData.user_id);
        companyContext.setCompanyId(userData.company_id);
        bankContext.setCompanyIsBank(userData.company_isBank);
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" ref={email} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" ref={password} />
        </Form.Group>
        <Button variant="primary" onClick={submitLogin}>
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default Login;