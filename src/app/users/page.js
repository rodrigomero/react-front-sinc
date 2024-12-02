"use client";

import React, { useEffect, useState } from 'react';
import '../styles/listagem.css'; 

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const UsersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/users`)
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
                <th>Username</th>
                <th>Email</th>
                <th>Administrador</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.isAdmin ? "Sim" : ""}</td>
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

export default UsersPage;
