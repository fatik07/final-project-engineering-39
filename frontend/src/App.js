// import logo from './logo.svg';
// import logo from './logo.svg';
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
// import { BrowserRouter as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/books/Books";
import DetailBooks from "./pages/books/DetailBooks";
import GetCookie from "./hooks/GetCookie";
import { useEffect } from "react";

function App() {
  const cek = {
    token: GetCookie("token"),
  };
  useEffect(() => {
    if (cek.token) {
      // console.log("masuk");
      return <Navigate to="/home" />;
    }
  });
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route
        exact
        path="home"
        element={
          cek.token ? <Home /> : <Navigate to="/" replace={true} />
          // GetCookie("token") ? <Home /> : <Navigate to="/" replace={true} />
          // <Home />
        }
      />
      <Route
        exact
        path="/books"
        element={
          cek.token ? <Books /> : <Navigate to="/" replace={true} />
          // <Home />
        }
      />
      <Route
        exact
        path="/books/:id"
        element={
          cek.token ? <DetailBooks /> : <Navigate to="/" replace={true} />
          // <DetailBooks />
        }
      />
      <Route
        exact
        path="/admin"
        element={
          cek.token ? <p>ini halaman admin</p> : <Navigate to="/" />
          // <h1>ini halaman Admin</h1>
        }
      />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
