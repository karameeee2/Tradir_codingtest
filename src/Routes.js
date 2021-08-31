import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";

import Home from "./Pages/Home";
import BeerList from "./Pages/BeerList";
// import ReactGA from "react-ga";

const Routes = () => {

  return (
    <Router>
        <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to='/home'></Redirect>
        </Route>
          <Route exact path="/beerList" component={BeerList}/>
        </Switch>
    </Router>
  );
};

export default Routes;
