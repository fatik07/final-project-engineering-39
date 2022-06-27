import React, { useState } from "react";
import img from "../../../assets/img/regisImg.png";
import "./Navbar_Regis.css";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

export default function Navbar() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  // const [formData, setFormData] = useState([]);
  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const respone = await fetch("http://localhost:8008/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          username,
          password,
          mail,
        }),
      });

      const content = await respone.json();
      console.log(content);

      navigate("/", { replace: true });
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <span className="text-ladang1">Ladang </span>
          <span className="text-materi1">Materi</span>
        </div>
        <div className="col-6">
          <div className="img-con">
            <img src={img} alt="regis photo" />
          </div>

          <form onSubmit={submit}>
            <div className="form-group row mb-3">
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={nama}
                  className="form-control"
                  name="nama"
                  id="inputName"
                  placeholder="name"
                  onChange={(e) => setNama(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label
                htmlFor="inputUsername"
                className="col-sm-2 col-form-label"
              >
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  name="username"
                  id="inputUsername"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  name="password"
                  id="inputPassword3"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="mail"
                  id="inputEmail"
                  placeholder="email"
                  required
                  onChange={(e) => setMail(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="buttonRegister">
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="col">
          <h4>Register Page</h4>
        </div>
      </div>
    </div>
  );
}
