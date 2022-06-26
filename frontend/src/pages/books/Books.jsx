import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { NavLink } from "react-router-dom";
import GetCookie from "../../hooks/GetCookie";
import axios from "axios";

export default function Books() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8008/Get", {
          withCredentials: true,
        });
        // const data = await res.data;
        setArticles(res.data.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
    GetCookie("token");
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-custom ms-5 me-5">
        <div className="row popular-books">
          <div className="col-12 col-lg-12 col-md-12 col-sm-12 text-center">
            <h1>All Books</h1>
          </div>
        </div>
        <div className="row mt-5">
          {loading ? (
            <p>Loading article ...</p>
          ) : (
            articles.map((article) => (
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
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
