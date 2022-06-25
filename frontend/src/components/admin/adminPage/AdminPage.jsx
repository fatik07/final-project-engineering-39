import React from "react";
import { useState } from "react";
import "./AdminPage.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AdminPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const [mopen, setMopen] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <Modal
        isOpen={mopen}
        onRequestClose={() => setMopen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "grey",
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "80px",
            right: "80px",
            bottom: "70px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h1 className="text-center">Edit</h1>
        <p>
          <label htmlFor="inputJudul3" className="col-sm-3 col-form-label">
            Judul
          </label>
          <input type="text" class="form-control" id="judul"></input>

          <label htmlFor="inputPenulis3" className="col-sm-3 col-form-label">
            Penulis
          </label>
          <input type="text" class="form-control" id="penulis"></input>

          <label htmlFor="inputDeskripsi3" className="col-sm-3 col-form-label">
            Deskripsi
          </label>
          <input type="text" class="form-control" id="deskripsi"></input>

          <button className="btn btn-success-custom" onClick={() => setMopen(false)}>
            Close
          </button>
        </p>
      </Modal>
      <div className="container">
        <div className="bloc-tabs">
          <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
            Data Table
          </button>
          <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
            Input Data
          </button>
          <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
            Coming Soon
          </button>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            <table class="table">
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
                <tr>
                  <th scope="row">1</th>
                  <td>Matematika Aljabar</td>
                  <td>2 Mei 2000</td>
                  <td>Tatang Nurjaman</td>
                  <td>Math</td>
                  <td>
                    <button type="button" class="btn btn-warning me-2" onClick={() => setMopen(true)}>
                      Edit
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>English Elementary</td>
                  <td>12 Juni 2004</td>
                  <td>John Doe</td>
                  <td>English</td>
                  <td>
                    <button type="button" class="btn btn-warning me-2" onClick={() => setMopen(true)}>
                      Edit
                    </button>
                    <button type="button" class="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>18 October 2019</td>
                  <td>James Morris</td>
                  <td>Fabel</td>
                  <td>
                    <button type="button" class="btn btn-warning me-2" onClick={() => setMopen(true)}>
                      Edit
                    </button>
                    <button type="button" class="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <form>
              <div class="mb-3">
                <label class="form-label">Judul</label>
                <input type="text" class="form-control" id="judul"></input>
              </div>

              <div class="mb-3">
                <label class="form-label">Tanggal Terbit</label>
                <input type="date" class="form-control" id="penulis"></input>
              </div>

              <div class="mb-3">
                <label class="form-label">Penulis</label>
                <input type="text" class="form-control" id="penulis"></input>
              </div>

              <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <input type="text" class="form-control" id="deskripsi"></input>
              </div>

              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>

          <div className={toggleState === 3 ? "content  active-content" : "content"}>
            <h2>Content 3</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed nostrum rerum laudantium totam unde adipisci incidunt modi alias! Accusamus in quia odit aspernatur provident et ad vel distinctio recusandae totam quidem
              repudiandae omnis veritatis nostrum laboriosam architecto optio rem, dignissimos voluptatum beatae aperiam voluptatem atque. Beatae rerum dolores sunt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminPage;
