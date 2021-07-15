import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import Offers from "./pages/Offers";
import Add from "./pages/Add";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthAPI from "./utils/AuthAPI";

function Routes() {
  const authApi = useContext(AuthAPI);
  return (
    <Switch>
      <RouteRegister
        path="/login"
        component={Login}
        auth={authApi.auth}
      />
      <RouteRegister
        path="/signup"
        component={SignUp}
        auth={authApi.auth}
      />
      <RouteProtected
        exact path={["/", "/listings"]}
        component={Listings}
        auth={authApi.auth}
      />
      <RouteProtected
        exact path="/listings/:id"
        component={PropertyDetail}
        auth={authApi.auth}
      />
      <RouteProtected
        exact path="/listings/:id/offers"
        component={Offers}
        auth={authApi.auth}
      />
      <RouteProtected
        exact path="/add"
        component={Add}
        auth={authApi.auth}
      />
    </Switch>
  );
}

const RouteRegister = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Component {...props} /> : <Redirect to="/listings" />
      }
    />
  );
};

const RouteProtected = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default Routes;