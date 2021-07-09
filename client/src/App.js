import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
            <Property />
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
