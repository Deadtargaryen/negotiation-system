import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product created successfully!');
      navigate('/products');
    } catch (error) {
      alert('Failed to create product.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleCreateProduct} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
