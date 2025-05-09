import React, { useState, useEffect } from 'react';
import { MenCollections, WomenCollection } from '../constants/collections';
import Header from '../components/header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartItemIds = localStorage.getItem('cart').split(',');
    const gender = localStorage.getItem('gender');
    const allProducts = () => {
      if (gender === 'm') {
        return MenCollections;
      }
      if (gender === 'f') {
        return WomenCollection;
      }
      return [];
    };
    const itemsInCart = allProducts().filter(product => cartItemIds.includes(product.id.toString()));
    setCartItems(itemsInCart);
    console.log(itemsInCart);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading your cart...</div>;
  }

  return (
      <div className="p-4 max-w-4xl mx-auto text-white">
          <Header heading={"CART"}/>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center border border-gray-700 rounded-lg shadow-md p-4 bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <img
                src={item.path}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />
              <div className="ml-6 flex flex-col justify-between h-full">
                <h2 className="text-lg font-semibold mb-2">{item.displayName}</h2>
                      <h2 className="text-lg font-semibold mb-2">{item.category[0].toUpperCase()+item.category.slice(1,item.category.length)}</h2>
                <p className="text-blue-400 font-bold text-xl">₹ {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
