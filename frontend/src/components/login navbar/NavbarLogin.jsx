import React from "react";
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

function navbar() {
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
                      <h2 className="text-center">Login To Your Account</h2>

                      <label for="inputEmail3" class="col-sm-3 col-form-label">
                        Email
                      </label>
                      <div class="col-sm-10"></div>
                      <input type="text" id="inputEmail3" placeholder="Email" className="form-control" />
                    </div>

                    <div className="form-group row mb-3">
                      <label for="inputPassword3" className="col-sm-3 col-form-label">
                        Password
                      </label>
                      <div class="col-sm-10"></div>
                      <input type="password" placeholder="Password" className="form-control" />
                    </div>

                    <div className="buttonLogin row mb-3">
                      <button type="button" class="btn btn-success">
                        Login
                      </button>
                    </div>
                    <p className="text-black">
                      dont have an account? <a href="register"> Register </a>
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
}
export default navbar;