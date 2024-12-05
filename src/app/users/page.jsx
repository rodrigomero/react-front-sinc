"use client";

import EditModal from "../components/editModal";
import ListingTable from "../components/listingTable";
import "../styles/login.css";

export default function ListagemUsuario() {
  let endpoint = "/users";

  let headers = ["ID", "Username", "Email", "Adm"];

  let columns = [
    { data: "id" },
    { data: "username" },
    { data: "email" },
    { data: "isAdmin" },
  ];

  return (
    <main>
      <EditModal entity="products" />
      <ListingTable
        title="Listagem de Usuarios"
        endpoint={endpoint}
        headers={headers}
        columns={columns}
        extra={null}
      />
    </main>
  );
}
