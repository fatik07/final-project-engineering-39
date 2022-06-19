// import logo from './logo.svg';
// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
// import { BrowserRouter as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/admin" element={<h1>ini halaman Admin</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
