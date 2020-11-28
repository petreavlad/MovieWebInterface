import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./pages/index";
import RegistrationPage from "./pages/registration";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/register" component={RegistrationPage} />
      <Route exact path="/resetpassword" component={RegistrationPage} />
      <Route exact path="/home" component={HomePage} />
    </Router>
  );
}

export default App;
