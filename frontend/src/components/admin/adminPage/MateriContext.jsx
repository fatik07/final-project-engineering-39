import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const MateriContext = createContext();

const MateriContextProvider = (props) => {
  const [AdminPage, setAdminPage] = useState([
    { id: uuidv4(), judul: "Matematika Aljabar", tanggal: "2 Mei 2000", penulis: "Tatang Nurjaman", deskripsi: "Math" },
    { id: uuidv4(), judul: "English Elementary", tanggal: "12 Juni 2004", penulis: "John Doe", deskripsi: "English" },
    { id: uuidv4(), judul: "Larry the Bird", tanggal: "18 October 2019", penulis: "James Morris", deskripsi: "Fabel" },
  ]);

  const deleteAdminPage = (id) => {
    setAdminPage(AdminPage.filter((AdminPage) => AdminPage.id !== id));
  };

  const updatedAdminPage = (id, updatedAdminPage) => {
    setAdminPage(AdminPage.map((AdminPage) => (AdminPage.id === id ? updatedAdminPage : AdminPage)));
  };

  return <MateriContext.Provider value={{ AdminPage, deleteAdminPage, updatedAdminPage }}>{props.Children}</MateriContext.Provider>;
};
export default MateriContextProvider;
