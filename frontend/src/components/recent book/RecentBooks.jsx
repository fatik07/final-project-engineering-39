import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RecentBooks.css";

export default function RecentBooks(props) {
  const [count, setCount] = useState(6);

  return (
    <div className="container-custom ms-5 me-5">
      <div className="row popular-books">
        <div className="col-12 col-lg-12 col-md-12 col-sm-12 text-center">
          <h1>Recent Books</h1>
        </div>
      </div>
      <div className="row mt-5">
        {props.getArticle().map((article, index) => {
          if (index < count) {
            return (
              <div className="col-12 col-lg-4 col-md-6 mb-3 d-flex justify-content-center">
                <div className="card" style={{ width: "20rem" }}>
                  <div className="card-body">
                    <h3 style={{ fontWeight: 500 }} className="card-title">
                      {article.judul}
                    </h3>
                    <p className="card-text">{article.tanggal}</p>
                    <NavLink
                      className="btn read-more"
                      to={`/books/${article.id}`}
                    >
                      Read More...
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <div className="row mt-3">
          <div className="col-12 col-xl-12 col-md-12 col-sm-12">
            <div className="text-center">
              <NavLink to="/books" className="btn read-more btn-lg">
                View All Books
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
