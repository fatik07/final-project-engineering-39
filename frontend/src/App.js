import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/books/Books";
import DetailBooks from "./pages/books/DetailBooks";
import Admin from "./pages/Admin";
import GetCookie from "./hooks/GetCookie";

function App() {
  const cek = {
    token: GetCookie("token"),
  };
  // console.log(cek);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* cek home */}
      {/* {cek.token ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route index element={<Login />} />
      )} */}

      <Route path="/home" element={<Home />} />

      <Route
        exact
        path="/books"
        element={cek.token ? <Books /> : <Navigate to="/" replace={true} />}
      />
      <Route
        exact
        path="/books/:id"
        element={
          cek.token ? <DetailBooks /> : <Navigate to="/" replace={true} />
        }
      />

      {/* {cek.token ? (
        <Route path="/admin" element={<Admin />} />
      ) : (
        <Route index element={<Login />} />
      )} */}

      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
