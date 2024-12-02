"use client";

import React, { useEffect, useState } from 'react';
import '../styles/listagem.css'; 
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const OrdersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/orders`)
      .then((response) => response.json())
      .then((dados) => setData(dados))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <main className="listagem-container grid justify-items-center min-h-screen">
      <div className='grid justify-items-center'>
        <h1 className="listagem-titulo align-self-center">Listagem de Produtos</h1>
        {data.length > 0 ? (
          <table className="listagem-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Id do Usuario</th>
                <th>Status</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Data de Compra</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td>{item.status}</td>
                  <td>{`R$ ${item.totalQuantity.toFixed(2)}`}</td>
                  <td>{item.totalPrice}</td>
                  <td>{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="listagem-carregando">Carregando dados...</p>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;

function formatDate(date) {
  let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear(),
      hour = d.getHours(),
      minutes = d.getMinutes();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/') + " - " +[hour, minutes].join(":");
}
