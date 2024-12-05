"use client";

import EditModal from "../components/editModal";
import ListingTable from "../components/listingTable";
import "../styles/login.css";

export default function ListagemProdutos() {
  let endpoint = "/products";

  let headers = [
    "ID",
    "Nome",
    "Descrição",
    "Categoria",
    "Preço",
    "Estoque",
    "Visivel",
    "Editar",
  ];

  let columns = [
    { data: "id" },
    { data: "name" },
    { data: "description" },
    {
      data: "category",
      render: (data) => data[0] + data.slice(1).toLowerCase(),
    },
    { data: "price", render: (data) => `R$ ${data.toFixed(2)}` },
    { data: "stock" },
    { data: "isVisible", render: (data) => (data ? "Sim" : null) },
    { className: "edit-cell" },
  ];

  let extra = {
    7: "edit",
  };

  return (
    <main>
      <EditModal entity="products" />
      <ListingTable
        title="Listagem de Produtos"
        endpoint={endpoint}
        headers={headers}
        columns={columns}
        extra={extra}
      />
    </main>
  );
}
