"use client";

import EditModal from "../components/editModal";
import ListingTable from "../components/listingTable";
import "../styles/login.css";
import formatDate from "../utils/dataUtil";

export default function ListagemOrders() {
  let endpoint = "/orders";

  let headers = [
    "ID",
    "UserId",
    "Status",
    "Quantidade",
    "Total",
    "Data de Compra",
  ];

  let columns = [
    { data: "id" },
    { data: "userId" },
    { data: "status", render: (data) => data[0] + data.slice(1).toLowerCase() },
    { data: "totalQuantity" },
    { data: "totalPrice", render: (data) => `R$ ${data.toFixed(2)}` },
    { data: "date", render: (data) => formatDate(data) },
  ];

  return (
    <main>
      <EditModal entity="orders" />
      <ListingTable
        title="Listagem de Pedidos"
        endpoint={endpoint}
        headers={headers}
        columns={columns}
        extra={null}
      />
    </main>
  );
}
