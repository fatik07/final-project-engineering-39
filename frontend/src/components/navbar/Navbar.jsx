import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import GetCookie from "../../hooks/GetCookie";
import RemoveCookie from "../../hooks/RemoveCookie";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  let navigate = useNavigate();
  const [name, setName] = useState("");

  // effect shadow navbar
  window.addEventListener("scroll", (e) => {
    const nav = document.querySelector(".navbar-custom");
    if (window.pageYOffset > 80) {
      nav.classList.add("add-shadow");
    } else {
      nav.classList.remove("add-shadow");
    }
  });

  // const token = localStorage.getItem("token");
  const token = GetCookie("token");

  useEffect(() => {
    let decodedHeader = jwt_decode(token);
    let name = decodedHeader.Username;
    setName(name);
  }, []);

  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      return navigate("/", { replace: true });
    }
  }, []);

  const logoutHanlder = async () => {
    // remove token
    RemoveCookie("token");
    // console.log(token)

    //redirect halaman login
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 fixed-top navbar-custom">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5 navbar-brand-custom" to="/home">
            <span className="text-ladang">Ladang </span>
            <span className="text-materi">Materi</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <NavLink
                  exact
                  className="nav-link"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" to="/books">
                  Books
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item px-2">
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hii, {name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {token ? (
                    <li>
                      <button onClick={logoutHanlder} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button onClick={logoutHanlder} className="dropdown-item">
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
