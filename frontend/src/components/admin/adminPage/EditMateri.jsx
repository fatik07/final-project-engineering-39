import { Form, Button } from "react-bootstrap";
import { MateriContext } from "../adminPage/MateriContext";
import { useContext, useState } from "react";

const EditMateri = ({ theAdminPage }) => {
  const id = theAdminPage.id;

  const [judul, setJudul] = useState(theAdminPage.Judul);
  const [tanggal, setTanggal] = useState(theAdminPage.Tanggal);
  const [penulis, setPenulis] = useState(theAdminPage.Penulis);
  const [deskripsi, setDeskripsi] = useState(theAdminPage.Deskripsi);

  const { updatedAdminPage } = useContext(MateriContext);

  const updatedAdminPage = { id, judul, tanggal, penulis, deskripsi };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatedAdminPage(id, updatedAdminPage);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" placeholder="Judul *" Judul="judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" placeholder="Tanggal *" Tanggal="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" placeholder="Penulis *" Penulis="penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" placeholder="Deskripsi *" Deskripsi="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
      </Form.Group>

      <Button variant="success" type="submit" block>
        Edit materi
      </Button>
    </Form>
  );
};
export default EditMateri;
