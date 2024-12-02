"use client";

import React, { useEffect, useState } from 'react';
import '../styles/listagem.css'; 
import { useRouter } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    router.refresh();

    fetch(`${baseUrl}/products`)
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
                <th>Nome</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => item.isVisible ? (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{`R$ ${item.price.toFixed(2)}`}</td>
                  <td>{item.stock}</td>
                </tr>
              ) : null)}
            </tbody>
          </table>
        ) : (
          <p className="listagem-carregando">Carregando dados...</p>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
