import React from "react";
import "./navbarlogin.css";
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
              <div className="col-md-5 login-col-custom ms-auto">
                <div className="card p-4 cek">
                  <div className="card-body">
                    <div className="form-group">
                      <h2> LOG IN TO YOUR ACCOUNT</h2>
                      <label>Email</label>
                      <input type="text" placeholder="Email" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Password" className="form-control" />
                    </div>
                    <div className="buttonLogin">
                      <button type="button" class="btn btn-success">
                        Login
                      </button>
                    </div>
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
