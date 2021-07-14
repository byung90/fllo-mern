import React, { useState, useEffect, Component, useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import Offers from "./pages/Offers";
import Add from "./pages/Add";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import API from "./utils/API";
import AuthAPI from "./utils/AuthAPI";
import CompanyContext from "./utils/CompanyContext";

function App() {
  const [auth, setAuth] = useState();
  // const [userId, setUserId] = useState();
  const [companyId, setCompanyId] = useState();
  const [companyIsBank, setCompanyIsBank] = useState();

  const readSession = async () => {
    const res = await API.checkAuth();
    console.log(res.data);
    if (res.data.auth) {
      const userData = res.data;
      setAuth(userData.auth);
      // setUserId(userData.user_id);
      setCompanyId(userData.company_id);
      setCompanyIsBank(userData.company_isBank);

    }
    else {
      setAuth(false);
    }
  }

  useEffect(() => {
    readSession();
  }, [auth])

  const RouteRegister = ({ component: Component, ...rest }) => {
    const authApi = useContext(AuthAPI);
    // console.log(authApi);
    return <Route
      {...rest}
      render={props =>
        !authApi.auth ? <Component {...props} /> : <Redirect to="/listings" />}
    />;
  }

  const RouteProtected = ({ component: Component, ...rest }) => {
    const authApi = useContext(AuthAPI);
    // console.log(authApi);
    return <Route
      {...rest}
      render={props =>
        authApi.auth ? <Component {...props} /> : <Redirect to="/login" />

      }

    />;
  }

  return (
    <AuthAPI.Provider value={{ auth, setAuth }}>
      <CompanyContext.Provider value={{ companyId, companyIsBank, setCompanyId, setCompanyIsBank }}>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <RouteRegister path="/login" component={Login} />
              <RouteRegister path="/signup" component={SignUp} />
              <RouteProtected exact path={["/", "/listings"]} component={Listings} />
              <RouteProtected exact path="/listings/:id" component={PropertyDetail} />
              <RouteProtected exact path="/listings/:id/offers" component={Offers} />
              <RouteProtected exact path="/add" component={Add} />
            </Switch>
          </div>
        </Router>
      </CompanyContext.Provider>
    </ AuthAPI.Provider>
  );
}

export default App;
