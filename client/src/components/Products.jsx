import React, { useEffect, useState } from 'react';
import api from '../services/api';  // Axios instance to handle API requests

const Products = () => {
  const [products, setProducts] = useState([]);
  const [offer, setOffer] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [negotiationData, setNegotiationData] = useState(null);  // To store negotiation progress
  const [userId] = useState(localStorage.getItem('userId'));  // Assuming user ID is stored in localStorage

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products.');
      }
    };
    fetchProducts();
  }, []);

  // Start negotiation process
  const handleStartNegotiation = async (product) => {
    setSelectedProduct(product);  // Set the selected product for negotiation
    try {
      const response = await api.post('/negotiation/start-negotiation', {
        userId,
        productId: product._id,
        initialOffer: product.price,  // Assuming negotiation starts from the product price
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNegotiationData(response.data);  // Store negotiation details like product price, counter offers
      alert('Negotiation started. First offer sent by the seller.');
    } catch (error) {
      console.error('Error starting negotiation:', error.response || error.message);
      alert('Failed to start negotiation.');
    }
  };

  // Submit user's offer
  const handleSubmitOffer = async (product) => {
    const currentOffer = parseFloat(offer);
    try {
      const response = await api.post('/negotiation/send-offer', {
        userId,
        productId: product._id,
        currentOffer,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const { accepted, counterOffer, finalOffer } = response.data;
      if (accepted) {
        alert(`Your offer of ${currentOffer} was accepted!`);
        setNegotiationData(null);  // End negotiation
      } else if (counterOffer) {
        setNegotiationData({ ...negotiationData, counterOffer });
        alert(`Counteroffer from seller: ${counterOffer}`);
      } else if (finalOffer) {
        alert(`Final offer from seller: ${finalOffer}. You can accept or reject.`);
        setNegotiationData({ ...negotiationData, finalOffer });
      }
    } catch (error) {
      console.error('Error submitting offer:', error.response || error.message);
      alert('Failed to submit offer.');
    }
  };

  // End the negotiation process
  const handleEndNegotiation = async (product) => {
    try {
      await api.post('/negotiation/end-negotiation', {
        userId,
        productId: product._id,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNegotiationData(null);  // Reset negotiation state
      setSelectedProduct(null);  // Reset the selected product
      alert('Negotiation ended.');
    } catch (error) {
      console.error('Error ending negotiation:', error);
    }
  };

  return (
    <div className="mt-10 mx-auto w-11/12 sm:w-2/3 p-5">
    {/* Logo at the top-left */}
    <div className="absolute top-4 left-4">
        <img src="/logo.png" alt="Logo" className="w-96 h-42" />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <ul className="space-y-6">
        {products.map((product) => (
          <li key={product._id} className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
              <button
                className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-300"
                onClick={() => handleStartNegotiation(product)}
              >
                Negotiate
              </button>
            </div>
            {selectedProduct && selectedProduct._id === product._id && negotiationData && (
              <div className="mt-4 space-y-4">
                <input
                  type="number"
                  placeholder="Your Offer"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                <button
                  onClick={() => handleSubmitOffer(product)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition duration-300"
                >
                  Submit Offer
                </button>
                {negotiationData.counterOffer && (
                  <p className="mt-2 text-yellow-600 font-semibold">Counter Offer: ${negotiationData.counterOffer}</p>
                )}
                {negotiationData.finalOffer && (
                  <div className="mt-2">
                    <p className="text-red-600 font-semibold">Final Offer: ${negotiationData.finalOffer}</p>
                    <button
                      onClick={() => handleEndNegotiation(product)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-300"
                    >
                      End Negotiation
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
