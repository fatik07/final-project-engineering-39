import React from "react";
import img from "../../assets/img/img-about.png";
import "./About.css";

export default function About() {
  return (
    <div className="container-custom ms-5 me-5" id="about">
      <div className="row">
        <div className="col-12 col-lg-7 col-md-12 col-sm-12 img-about">
          <img src={img} alt="ini adalah gambar img about" />
        </div>
        <div className="col-12 col-lg-5 col-md-12 col-sm-12 text-about">
          <h5>About Us</h5>
          <h1>Welcome to Ladang Materi</h1>
          <p className="mt-4">
            <b>Ladang Materi</b> is a learning website that is intended for high
            school students (equivalent). Where does this Ladang Materi have
            material learning that is needed for high school children
            (equivalent). Ladang Materi is very interesting, innovative and easy
            to understand and studied especially high school children.
          </p>
          <div className="row button-about">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="learn-more">
                <a href="#">Learn More...</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
