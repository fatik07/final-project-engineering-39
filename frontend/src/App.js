// import logo from './logo.svg';
import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
// import login from "./components/login/login";

function App() {
  return (
    <>
      {/* <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={login} /> */}
      <Home />
      {/* <login />
        </Switch>
      </Router> */}
    </>
  );
}

export default App;
