import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import img from "../../assets/img/img-login.png";
import GetCookie from "../../hooks/GetCookie";
import jwt_decode from "jwt-decode";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  let navigate = useNavigate();

  let sectionStyle = {
    width: "100%",
    height: "100vh",

    // backgroundPosition: 'center',
    backgroundSize: "cover",
    backgroundRepeat: "no-repseat",
    backgroundImage: `url(${img})`,
  };

  // let roleToken = GetCookie("token");
  // let newRole = jwt_decode(roleToken);
  // console.log(roleToken);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8008/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
          token,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        const redirectCookie = GetCookie("token", JSON.stringify(data));
        // setToken({ fetchToken });
        setToken(redirectCookie);

        // set to admin
        let decodedHeader = jwt_decode(redirectCookie);
        let newRole = decodedHeader.Role;
        if (newRole === "admin") {
          navigate("/admin", { replace: true });
          console.log(newRole);
        }
      }
      if (res.status === 401) {
        alert("Masukkan Username atau Password");
      }
    } catch (error) {
      if (error) {
        // alert("gagal");
        console.log(error);
      }
    }
  };

  return (
    <div className="main-login" style={sectionStyle}>
      <div className="login-contain">
        <div className="flex-row align-items-end">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-md-6 login-col-custom ms-5 me-5">
                <div className="card p-3 cek">
                  <div className="card-body">
                    {/* redirect ke home */}
                    {token && <Navigate to="/home" replace={true} />}
                    <form onSubmit={submit}>
                      <div className="form-group row mb-2">
                        <NavLink className="nav-link active" aria-current="page" to="/"></NavLink>
                        <h2 className="text-center">Login To Your Account </h2>
                        <label htmlFor="inputUsername3" className="col-sm-3 col-form-label">
                          Username
                        </label>
                        <div className="col-sm-10"> </div>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} name="username" type="username" id="inputUsername3" placeholder="Enter username" className="form-control" />
                      </div>

                      <div className="form-group row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
                          Password
                        </label>
                        <div className="col-sm-10"></div>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Enter password" className="form-control" />
                      </div>

                      <div className="buttonLogin row mb-3">
                        <button className="btn btn-success-custom" type="submit">
                          Login
                        </button>
                      </div>
                      <p className="text-black">
                        Don't have an account? <a href="register"> Register </a>
                      </p>
                    </form>
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
export default App;
