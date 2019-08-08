import React from "react";

import {  BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import Home from "./pages/Home"
import FrizTip from "./pages/FrizTip"

class App extends React.Component {


render () {

return <Router>
  <Route exact path="/" component={Home} />
  <Route path="/friztip" component={FrizTip} />
</Router>

}


}

export default App;
