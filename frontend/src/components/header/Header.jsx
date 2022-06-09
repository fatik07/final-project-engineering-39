import React from "react";
import "./Header.css";
import img from "../../assets/img/img-header.png";

export default function Header() {
  return (
    <div className="container-custom ms-5 me-5">
      <div className="row">
        <div className="highlight col-6 col-lg-6 col-md-12">
          <h1>Make it Simple</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
            similique tenetur atque sequi. Vel ipsa eos esse, amet error tempora
            voluptatibus, laboriosam accusamus dolore maxime, quisquam modi
            provident quidem dignissimos. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Culpa similique tenetur atque sequi.
            Vel ipsa eos esse, amet error tempora voluptatibus, laboriosam
            accusamus dolore maxime, quisquam modi provident quidem dignissimos
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
        <div className="img-header col-6 col-lg-6 col-md-12">
          <img src={img} alt="ini adalah gambar img header" />
        </div>
      </div>
    </div>
  );
}
