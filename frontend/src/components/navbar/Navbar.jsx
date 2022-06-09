import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg py-3 fixed-top navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand ms-5 navbar-brand-custom" href="#">
            <span className="text-ladang">Ladang </span>
            <span className="text-materi">Materi</span>
          </a>
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">
                  Books
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item ps-3">
                <button class="btn btn-success-custom" type="submit">
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
