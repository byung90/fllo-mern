import React, { useState, useEffect, useRef } from "react";
import API from "../utils/API";
import { Form, Button } from "react-bootstrap"

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({});
  const [companiesInfo, setCompaniesInfo] = useState({});
  let email = useRef({});
  let password = useRef({});
  let firstName = useRef({});
  let lastName = useRef({});
  let companyName = useRef({});

  useEffect(() => {
    getAllCompanies();
  })

  function getAllCompanies() {
    API.getAllCompanies()
      .then(res => {
        console.log(res.data);
        setCompaniesInfo(res.data);
      })
      .catch(err => console.log(err));
  }

  function submitSignUp() {
    const loginBody = {
      email: email.current.value,
      password: password.current.value
    }

    API.postLogin(loginBody)
      .then(res => {
        console.log(res);
        setUserInfo(res.data);
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Company</Form.Label>
          <Form.Select aria-label="Select Company" ref={companyName}>
            <option>Select Company</option>
            {companiesInfo.map(company => (
              <option value={company._id} key={company._id}>{company.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
};

export default SignUp;