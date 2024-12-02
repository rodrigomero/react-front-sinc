"use client";

import React, { useEffect, useState } from 'react';
import '../styles/listagem.css'; 
import { useRouter } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [refreshTable, setRefreshTable] = useState(0); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });
  const router = useRouter();

  useEffect(() => {
    router.refresh();

    fetch(`${baseUrl}/products`)
      .then((response) => response.json())
      .then((dados) => setData(dados))
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, [refreshTable]);

  const openModal = (product) => {
    
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const openNewModal = (product) => {
    setIsNewModalOpen(true);
    setFormData((prevData) => ({
      ...prevData,
      ["category"]: 0,
    }));

  };

  
  const closeNewModal = () => {
    setIsNewModalOpen(false);
    
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = { ...selectedProduct, ...formData };
    updatedProduct.category = selectToValue(updatedProduct.category);
    
    fetch(`${baseUrl}/products/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
       
        setData((prevData) =>
          prevData.map((item) => (item.id === data.id ? data : item))
        );
        closeModal();
      })
      .catch((error) => console.error('Erro ao atualizar o produto:', error));
  };
  const handleNewSubmit = (e) => {
    e.preventDefault();
    formData.category = parseInt(formData.category);
    fetch(`${baseUrl}/products/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
       
        setData((prevData) =>
          prevData.map((item) => (item.id === data.id ? data : item))
        );
        closeNewModal();
        setRefreshTable(refreshTable+1);
      })
      .catch((error) => console.error('Erro ao atualizar o produto:', error));
  };

  return (
    <main className="listagem-container grid justify-items-center min-h-screen">
      <div className='grid justify-items-center'>
        <div className='container-title'>
          <h1 className="listagem-titulo align-self-center">Listagem de Produtos</h1>

          
        </div>
        {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Categoria</label>
                <select name="category" id="category" value={valueToSelect(formData.category)} onChange={handleChange} required>
                  <option value={0} >Instrumento</option>
                  <option value={1}>Acessorio</option>
                  <option value={2}>Amplificador</option>                                
                </select>
              </div>
              <div className='flex'>

              
              <div>
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="stock">Estoque</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
              <div className='modal-btns'>
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" onClick={closeModal} className="btn-fechar-modal">
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {isNewModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Produto</h2>
            <form onSubmit={handleNewSubmit}>
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Categoria</label>
                <select name="category" id="category" onChange={handleChange} required>
                  <option default value={0} >Instrumento</option>
                  <option value={1}>Acessorio</option>
                  <option value={2}>Amplificador</option>                                
                </select>
              </div>
              <div className='flex'>

              
              <div>
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  id="price"
                  name="price"     
                  onChange={handleChange}        
                  required
                />
              </div>
              <div>
                <label htmlFor="stock">Estoque</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"   
                  onChange={handleChange}         
                  required
                />
              </div>
              </div>
              <div className='modal-btns'>
                <button type="submit" className="btn-salvar">Salvar</button>
                <button type="button" onClick={closeNewModal} className="btn-fechar-modal">
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <th></th>
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
                  <td><button onClick={() => openModal(item)} className="btn-editar">
                      Editar
                    </button>
                  </td>
                </tr>
              ) : null)}
            </tbody>
          </table>
        ) : (
          <p className="listagem-carregando">Carregando dados...</p>
        )}
      
      <button 
            onClick={openNewModal} 
            className="btn-abrir-modal justify-self-end"
            >
            Adicionar Produto
          </button>
        </div>
      
    </main>
  );
};

export default ProductsPage;

function valueToSelect(category){

  if (category === "INSTRUMENTO")  return 0;
  if (category === "ACESSORIO")    return 1;
  if (category === "AMPLIFICADOR") return 2; 
}

function selectToValue(category){

  if (category === "INSTRUMENTO")  return 0;
  if (category === "ACESSORIO")    return 1;
  if (category === "AMPLIFICADOR") return 2; 
}