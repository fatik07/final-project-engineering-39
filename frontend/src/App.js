// import logo from './logo.svg';
// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
// import { BrowserRouter as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
