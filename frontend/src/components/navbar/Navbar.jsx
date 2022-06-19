import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  // effect shadow navbar
  window.addEventListener("scroll", (e) => {
    const nav = document.querySelector(".navbar-custom");
    if (window.pageYOffset > 80) {
      nav.classList.add("add-shadow");
    } else {
      nav.classList.remove("add-shadow");
    }
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 fixed-top navbar-custom">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5 navbar-brand-custom" to="/">
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
                  className="nav-link active"
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
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" to="#">
                  Contact
                </NavLink>
              </li>
              {/* <li className="nav-item ps-3">
                <button class="btn btn-success-custom" type="submit">
                  <NavLink to="login">Sign In</NavLink>
                </button>
              </li> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hii, User
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink class="dropdown-item" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
