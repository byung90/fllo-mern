import React, { useState, useEffect, } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Routes from "./Routes";
import API from "./utils/API";
import AuthAPI from "./utils/AuthAPI";
import CompanyContext from "./utils/CompanyContext";
import BankContext from "./utils/BankContext";
import './App.css';

function App() {
  const [auth, setAuth] = useState(false);
  // const [userId, setUserId] = useState();
  const [companyId, setCompanyId] = useState();
  const [companyIsBank, setCompanyIsBank] = useState();

  function readSession() {
    API.checkAuth()
      .then(res => {
        if (res.data.auth) {
          const userData = res.data;
          setAuth(userData.auth);
          // setUserId(userData.user_id);
          setCompanyId(userData.company_id);
          setCompanyIsBank(userData.company_isBank);
          console.log("test");
        }
      })
  }

  useEffect(() => {
    readSession();
  }, [])

  return (
    <AuthAPI.Provider value={{ auth, setAuth }}>
      <CompanyContext.Provider value={{ companyId, setCompanyId }}>
        <BankContext.Provider value={{ companyIsBank, setCompanyIsBank }}>
          <Router>
            <Header />
            <div className="container">
              <Routes />
            </div>
          </Router>
        </BankContext.Provider>
      </CompanyContext.Provider>
    </ AuthAPI.Provider>
  );
}

export default App;
