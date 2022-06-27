import React from "react";
import "./AdminPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import GetCookie from "../../../hooks/GetCookie";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function AdminPage() {
  // const param = useParams();
  // console.log(param);
  const [toggleState, setToggleState] = useState(1);
  const [articles, setArticles] = useState([]);
  let navigate = useNavigate();
  const [data, setData] = useState({
    Judul: "",
    Tanggal: "",
    Id_Penulis: "",
    Deskripsi: "",
  });

  const checkTokenAdmin = GetCookie("token");
  const checkRole = jwt_decode(checkTokenAdmin);

  useEffect(() => {
    if (checkRole.Role !== "admin") {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (!checkTokenAdmin) {
      navigate("/");
    }
  }, []);

  // input data
  const submit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8008/Add", {
        Judul: data.Judul,
        Tanggal: data.Tanggal,
        Id_Penulis: parseInt(data.Id_Penulis),
        Deskripsi: data.Deskripsi,
      },{withCredentials: true})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    // console.log(newData);
  }

  // get data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const resGet = await axios.get("http://localhost:8008/Get", {
          withCredentials: true,
        });
        setArticles(resGet.data.data);
        // console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticle();
  }, []);

  // edit data
  // delete data

  const handleDelete = (id) => {
    // const newDataDelete = articles.filter((item) => item.id !== id);
    // setArticles(newDataDelete);
    axios
      .delete(`http://localhost:8008/Delete?id=${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Data Table
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Input Data
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Coming Soon
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Judul</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Penulis</th>
                  <th scope="col">Deskripsi</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) =>
                  article.deskripsi.length > 15 ? (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{article.judul}</td>
                      <td>{article.tanggal}</td>
                      <td>{article.penulis}</td>
                      {/* <td>{article.deskripsi}</td> */}
                      <td>{article.deskripsi.substring(0, 15)}...</td>
                      <td>
                        <button type="button" className="btn btn-warning me-2">
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(article.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{article.judul}</td>
                      <td>{article.tanggal}</td>
                      <td>{article.penulis}</td>
                      <td>{article.deskripsi}</td>
                      {/* <td>{article.deskripsi.substring(0, 20)}...</td> */}
                      <td>
                        <button type="button" className="btn btn-warning me-2">
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(article.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Judul</label>
                <input
                  type="text"
                  value={data.Judul}
                  className="form-control"
                  name="Judul"
                  id="Judul"
                  onChange={(e) => handle(e)}
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Tanggal Terbit</label>
                <input
                  type="date"
                  value={data.Tanggal}
                  className="form-control"
                  name="Tanggal"
                  id="Tanggal"
                  onChange={(e) => handle(e)}
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Penulis</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={data.Id_Penulis}
                  className="form-control"
                  name="Id_Penulis"
                  id="Id_Penulis"
                  placeholder="1-5"
                  onChange={(e) => handle(e)}
                ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <input
                  type="text"
                  value={data.Deskripsi}
                  className="form-control"
                  name="Deskripsi"
                  id="Deskripsi"
                  onChange={(e) => handle(e)}
                ></input>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>

          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            <h2>Content 3</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
              nostrum rerum laudantium totam unde adipisci incidunt modi alias!
              Accusamus in quia odit aspernatur provident et ad vel distinctio
              recusandae totam quidem repudiandae omnis veritatis nostrum
              laboriosam architecto optio rem, dignissimos voluptatum beatae
              aperiam voluptatem atque. Beatae rerum dolores sunt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;