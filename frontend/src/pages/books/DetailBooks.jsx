import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams, NavLink } from "react-router-dom";

export default function Books() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8008/GetTaskById?id=${id}`);
        const data = await res.json();
        setArticle(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (article === null) {
    return <p>Article not found</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container-custom ms-5 me-5">
        <div className="row popular-books">
          <div className="col-12 col-lg-12 col-md-12 col-sm-12 text-center">
            <h1>{article.judul}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-10 col-lg-10 col-md-10 col-sm-10 d-flex justify-content-center me-auto ms-auto">
            <p>{article.deskripsi}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-10 col-lg-10 col-md-10 col-sm-10 d-flex justify-content-center me-auto ms-auto">
            <NavLink className="btn read-more" to="/books">
              Back
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
