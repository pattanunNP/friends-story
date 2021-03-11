import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/create";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="bg">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/create" component={Create}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
