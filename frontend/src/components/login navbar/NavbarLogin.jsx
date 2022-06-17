import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import img from "../../assets/img/img-login.png";

let sectionStyle = {
  width: "100%",
  height: "100vh",

  // backgroundPosition: 'center',
  backgroundSize: "cover",
  backgroundRepeat: "no-repseat",
  backgroundImage: `url(${img})`,
};

const NavbarLogin = () => {
  return (
    <div className="main-login" style={sectionStyle}>
      <div className="login-contain">
        <div className="flex-row align-items-end">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-md-6 login-col-custom ms-5 me-5">
                <div className="card p-3 cek">
                  <div className="card-body">
                    <div className="form-group row mb-2">
                      <NavLink className="nav-link active" aria-current="page" to="/"></NavLink>
                      <h2 className="text-center">Login To Your Account</h2>

                      <label for="inputUsername3" class="col-sm-3 col-form-label">
                        Username
                      </label>
                      <div class="col-sm-10"></div>
                      <input type="text" id="inputUsername3" placeholder="Username" className="form-control" />
                    </div>

                    <div className="form-group row mb-3">
                      <label for="inputPassword3" className="col-sm-3 col-form-label">
                        Password
                      </label>
                      <div class="col-sm-10"></div>
                      <input type="password" placeholder="Enter password" className="form-control" />
                    </div>

                    <div className="buttonLogin row mb-3">
                      <button class="btn btn-success-custom" type="submit">
                        <NavLink to="Home">Login</NavLink>
                      </button>
                    </div>
                    <p className="text-black">
                      Don't have an account? <a href="register"> Register </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavbarLogin;
