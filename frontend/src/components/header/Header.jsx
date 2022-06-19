import React from "react";
import "./Header.css";
import img from "../../assets/img/img-header.png";

export default function Header() {
  return (
    <div className="container-custom ms-5 me-5">
      <div className="row">
        <div className="highlight col-12 col-lg-6 col-md-12 col-sm-12">
          <h1>Make it Simple</h1>
          <p>
            <b>Ladang Materi</b> is a learning website that is intended for high
            school students (equivalent). Where does this Ladang Materi have
            material learning that is needed for high school children
            (equivalent). Ladang Materi is very interesting, innovative and easy
            to understand and studied especially high school children.
          </p>
          <div className="row button-header">
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div className="start-learning">
                <a href="#">Start Learning</a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="discover">
                <a href="#">Discover</a>
              </div>
            </div>
          </div>
        </div>
        <div className="img-header col-12 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-end">
          <img src={img} alt="ini adalah gambar img header" />
        </div>
      </div>
    </div>
  );
}
