import React from "react";
import "./navbarlogin.css";

export default function navbar() {
  return (
    <div className="container">
      <div class="row">
        <div className="col">
          <h1 className="text-login"> Log in Your Account</h1>
        </div>

        <form>
          <div class="form-group row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
            </div>
          </div>

          <div class="form-group row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword3" placeholder="Password"></input>
            </div>
          </div>

          <div className="buttonLogin">
            <button type="button" class="btn btn-success">
              Login
            </button>
            <p className="text-black">
              {" "}
              dont have an account?<a href="/register"> Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
