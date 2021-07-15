import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";
import AuthAPI from "../../utils/AuthAPI";

const Header = () => {
  const authApi = useContext(AuthAPI);
  const logOut = () => {
    API.logout()
      .then(response => {
        authApi.setAuth(false);
      })
  }

  return (
    <div className="d-flex">
      <div className="p-2">
        <p>Company Name</p>
      </div>
      <div className="ms-auto p-2">
        <p>Icon</p>
        <Button onClick={logOut}>Log out</Button>
      </div>
    </div>
  )
};

export default Header;