import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import Offers from "./pages/Offers";
import Add from "./pages/Add";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={["/", "/listings"]}>
            <Listings />
          </Route>
          <Route exact path="/listings/:id">
            <PropertyDetail />
          </Route>
          <Route exact path="/listings/:id/offers">
            <Offers />
          </Route>
          <Route exact path="/listings/add">
            <Add />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
