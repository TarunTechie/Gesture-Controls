import React, { useState, useEffect,useContext } from 'react';
import { MenCollections, WomenCollection } from '../constants/collections';
import Header from '../components/header';
import Loader from '../components/loader';
import GestureGuide from '../components/GestureGuide';
import { useNavigate } from 'react-router-dom';
import { Broadcast } from '../components/broadcaster';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const{gesture,setGesture}=useContext(Broadcast)
  // Define the gestures for this page
  const pageGestures = {
    back: {
      icon: "./gesture_icon/back.svg",
      action: "Go Back"
    },
    thumbsUp: {
      icon: "./gesture_icon/thumbsUp.svg",
      action: "Checkout"
    }
  };

  useEffect(() => {
    // Fix: Check if cart exists in localStorage
    const cartString = localStorage.getItem('cart');
    if (!cartString) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    
    const cartItemIds = cartString.split(',').filter(id => id !== '');
    
    // Take only the last 6 items (or fewer if there aren't 6)
    const lastSixItemIds = cartItemIds.slice(Math.max(0, cartItemIds.length - 6));
    
    const gender = localStorage.getItem('gender');
    const allProducts = gender === 'm' ? MenCollections : (gender === 'f' ? WomenCollection : []);
    
    const itemsInCart = allProducts.filter(product => 
      lastSixItemIds.includes(product.id.toString())
    );
    
    setCartItems(itemsInCart);
    setLoading(false);
  }, []);

  const removeFromCart = (itemId) => {
    const cartString = localStorage.getItem('cart');
    if (!cartString) return;
    
    const cartItemIds = cartString.split(',').filter(id => id !== '');
    const newCartItemIds = cartItemIds.filter(id => id !== itemId.toString());
    
    localStorage.setItem('cart', newCartItemIds.join(',') + ',');
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Replace with your checkout logic
    alert('Proceeding to checkout!');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    if (gesture.gesture != null)
    {
      if (gesture.gesture === 'thumbs_up')
      {
        localStorage.clear('cart')
        navigate('/')
      }
    }
  },[gesture])
  return (
    <div className="h-screen bg-[#210632] flex flex-col overflow-hidden">
      <Header heading="CART" />
      
      {/* Gesture Guide */}
      <div>
        <GestureGuide gestures={pageGestures} position="top" />
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 max-h-[calc(100vh-150px)]">
          <div className="w-full max-w-4xl">
            {/* Cart title */}
            <h2 className="text-white/80 text-2xl font-light text-center mb-6">
              Your Shopping Cart
            </h2>
            
            {cartItems.length === 0 ? (
              <div className="bg-[#3c2e58]/80 backdrop-blur-md rounded-xl p-12 text-center">
                <img 
                  src="./gesture_icon/open_cart.svg" 
                  className="w-16 h-16 mx-auto" 
                  alt="Empty Cart"
                  style={{ filter: 'invert(100%)' }}
                />
                <p className="text-white text-xl">Your cart is empty</p>
                <button 
                  onClick={() => navigate('/categories')}
                  className="mt-6 bg-[#7E8ABA]/80 hover:bg-[#7E8ABA] text-white px-6 py-1 rounded-full transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Cart items grid */}
                <div className="grid grid-cols-2 gap-5 mb-4">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="bg-[#3c2e58]/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-purple-500/20"
                    >
                      <div className="flex p-3">
                        {/* Item image */}
                        <div className="w-1/3">
                          <img
                            src={item.path}
                            alt={item.displayName}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        {/* Item details */}
                        <div className="w-2/3 pl-4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-sm">{item.displayName}</h3>
                            <p className="text-white/70 text-xs mt-1 capitalize">{item.category}</p>
                            <p className="text-white/70 text-xs">Color: {item.color}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-white font-bold">₹ {item.price}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 text-xs hover:text-red-300 transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart summary */}
                <div className="bg-[#3c2e58]/80 backdrop-blur-md rounded-xl p-4 mb-4 border border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">Cart Summary</h3>
                    <p className="text-white">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                  </div>
                  
                  <div className="border-t border-purple-500/30 my-3"></div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-white">Total</p>
                    <p className="text-white font-bold text-xl">₹ {getTotalPrice()}</p>
                  </div>
                </div>
                
                {/* Checkout button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleCheckout}
                    className="flex items-center gap-2 bg-[#7E8ABA] hover:bg-[#8E9ACA] text-white px-8 py-3 rounded-full transition-colors duration-300 shadow-lg"
                  >
                    <img 
                      src="./gesture_icon/thumbsUp.svg" 
                      className="h-5 w-5" 
                      alt="Thumbs up"
                      style={{ filter: 'invert(100%)' }}
                    />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;