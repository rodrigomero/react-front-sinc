/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
"use client";

import React, { useContext, useEffect, useState } from "react";
import "../styles/listagem.css";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { MdEdit } from "react-icons/md";
import { EditContext } from "../context/editContext";
// eslint-disable-next-line react-hooks/rules-of-hooks
DataTable.use(DT);

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ListingTable = ({ endpoint, headers, columns, extra, title }) => {
  const [data, setData] = useState([]);
  const [slots, setSlots] = useState({});
  let { setFormData, setIsModalOpen } = useContext(EditContext);

  useEffect(() => {
    fetch(baseUrl + endpoint)
      .then((response) => response.json())
      .then((dados) => {
        setData(dados);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, [endpoint]);

  useEffect(() => {
    let generatedSlots = {};
    for (const key in extra) {
      generatedSlots[key] = assignSlot(extra[key]);
    }
    setSlots(generatedSlots);
  }, [extra]);

  function assignSlot(e) {
    if (e === "edit")
      return (data, row) => <MdEdit onClick={() => handleEdit(row)} />;
  }

  function handleEdit(row) {
    setIsModalOpen(true);
    setFormData(row);
  }

  return (
    <main className="listagem-container grid justify-items-center min-h-screen">
      <div className="grid justify-items-center">
        <div className="container-title">
          <h1 className="listagem-titulo align-self-center">{title}</h1>
        </div>

        {data.length > 0 ? (
          <DataTable
            className="listagem-tabela display"
            columns={columns}
            data={data}
            slots={slots}
          >
            <thead>
              <tr>
                {headers.map((e) => (
                  <th key={`th-${e}`}>{e}</th>
                ))}
              </tr>
            </thead>
          </DataTable>
        ) : (
          <p className="listagem-carregando">Carregando dados...</p>
        )}
      </div>
    </main>
  );
};

export default ListingTable;
