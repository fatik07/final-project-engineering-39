import React from "react";
import "./navbarlogin.css";
import img from "../../assets/img/img-login.png";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card p-4">
                  <div className="card-body">
                    <div className="form-group">
                      <h2> Log in To Your Account</h2>
                      <label>Email</label>
                      <input type="text" placeholder="Email" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Password" className="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary float-right">
                      Masuk <i class="ti-angle-double-right"></i>
                    </button>
                    <p className="text-black">
                      dont have an account? <a href="register"> Register </a>{" "}
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
