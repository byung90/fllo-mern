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

function App() {
  const [auth, setAuth] = useState(flase);
  const [isLoggedIn, setIsLoggedIn] = useState();

  // useEffect(() => {
  //   checkAuth();
  // }, [isLoggedIn]);

  // function checkAuth() {
  //   API.checkAuth()
  //     .then(res => {
  //       console.log(res.data);
  //       setIsLoggedIn(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }

  // if (!isLoggedIn) {
  //   return <Login />
  // }
  // if (!token) {
  //   console.log();
  //   return <Login setToken={setToken} />
  // }

  const RouteRegister = ({ component: Component, ...rest }) => {
    const authAPI = React.useContext(AuthAPI);
    return <Route
      {...rest}
      render={props =>
        !authApi.auth ? <Component {...props} /> : <Redirect to="/listings" />}
    />;
  }

  const RouteProtected = ({ component: Component, ...rest }) => {
    const authAPI = React.useContext(AuthAPI);
    return <Route
      {...rest}
      render={props =>
        authApi.auth ? <Component {...props} /> : <Redirect to="/login" />}
    />;
  }

  return (
    <AuthAPI.Provider value={{ auth, setAuth }}>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <RouteRegister path="/login" component={Login} />
            <RouteRegister path="/signup" component={SignUp} />
            <RouteProtected exact path={[" /", "/listings"]} component={Listings} />
            <RouteProtected exact path="/listings/:id" component={PropertyDetail} />
            <RouteProtected exact path="/listings/:id/offers" component={Offers} />
            <RouteProtected exact path="/add" component={Add} />
          </Switch>
        </div>
      </Router>
    </ AuthAPI.Provider>
  );
}

export default App;
