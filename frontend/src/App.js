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
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
