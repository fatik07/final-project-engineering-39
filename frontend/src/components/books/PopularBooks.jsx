import React from "react";
import book1 from "../../assets/img/book-1.jpg";
import "./PopularBooks.css";

export default function PopularBooks() {
  return (
    <div className="container-custom ms-5 me-5">
      <div className="row popular-books">
        <div className="col-12 col-lg-12 col-md-12 col-sm-12 text-center">
          <h1>Popular Books</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
          <div className="card" style={{ width: "20rem" }}>
            <img src={book1} className="card-img-top card-img-custom" alt="" />
            <div className="card-body">
              <h5 className="card-title">Belajar Memahami Dia</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn read-more">
                Read More ...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
