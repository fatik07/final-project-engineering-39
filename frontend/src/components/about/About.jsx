import React from "react";
import img from "../../assets/img/img-about.png";
import "./About.css";

export default function About() {
  return (
    <div className="container-custom ms-5 me-5">
      <div className="row">
        <div className="col-12 col-lg-7 col-md-12 col-sm-12 img-about">
          <img src={img} alt="ini adalah gambar img about" />
        </div>
        <div className="col-12 col-lg-5 col-md-12 col-sm-12 text-about">
          <h5>About Us</h5>
          <h1>Welcome to Ladang Materi</h1>
          <p className="mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
            similique tenetur atque sequi. Vel ipsa eos esse, amet error tempora
            voluptatibus, laboriosam accusamus dolore maxime, quisquam modi
            provident quidem dignissimos. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Culpa similique tenetur atque sequi.
            Vel ipsa eos esse, amet error tempora voluptatibus, laboriosam
            accusamus dolore maxime, quisquam modi provident quidem dignissimos
          </p>
          <div className="row button-about">
            <div className="col-lg-5 col-md-5 col-sm-12">
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
