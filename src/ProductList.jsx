import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false); 
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  // Access the current items array from the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total number of items dynamically to display in the navbar badge
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Hardcoded product database grouped into 3 distinct categories with 6 plants each
  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", description: "Calming aroma, perfect for relaxation.", cost: "$15" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1508747703725-719777637510", description: "Sweet-scented flowers that bloom beautifully.", cost: "$18" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515514014902-ac4c058a3cd7", description: "Culinary herb with a crisp, refreshing scent.", cost: "$12" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1622484211148-7163014aa0c4", description: "Easy to grow, refreshing fragrance.", cost: "$10" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b", description: "Invigorating minty aroma with silvery leaves.", cost: "$22" },
        { name: "Basil", image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121", description: "Sweet herb widely loved for both aroma and culinary use.", cost: "$9" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921", description: "Soothing gel inside, great for skin care.", cost: "$14" },
        { name: "Echinacea", image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a", description: "Beautiful blooms traditionally used to boost immunity.", cost: "$16" },
        { name: "Chamomile", image: "https://images.unsplash.com/photo-1515549833447-44730313d8d3", description: "Daisy-like flowers excellent for herbal relaxation tea.", cost: "$11" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0", description: "Bright gold petals used in soothing skin salves.", cost: "$13" },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1536882240095-0379873feb4e", description: "Strong digestive aid properties with a cooling finish.", cost: "$10" },
        { name: "Gotu Kola", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", description: "Ancient herb praised for supporting brain vitality.", cost: "$19" }
      ]
    },
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", description: "Filters toxins and thrives on low maintenance.", cost: "$25" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572587326978-2d530663198a", description: "Excellent at clearing indoor air pollutants.", cost: "$15" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355", description: "Elegant white flowers that neutralize household gases.", cost: "$28" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4", description: "Adds lush green foliage while acting as a natural humidifier.", cost: "$20" },
        { name: "English Ivy", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9", description: "Classic climbing plant that reduces airborne molds.", cost: "$17" },
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643c2a9a9361", description: "Tolerates extreme neglect while purifying office environments.", cost: "$24" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="#" onClick={handlePlantsClick}>
            <h3>Paradise Nursery</h3>
            <p>Where Green Meets Serenity</p>
          </a>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" className="cart-icon-container" onClick={handleCartClick}>
            <div className="cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-quantity-badge">{totalCartQuantity}</span>
            </div>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-listing-container">
          {plantsArray.map((categoryGroup, catIdx) => (
            <div key={catIdx} className="category-section">
              <h2 className="category-title">{categoryGroup.category}</h2>
              <div className="product-grid">
                {categoryGroup.plants.map((plant, plantIdx) => (
                  <div key={plantIdx} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'disabled' : ''}`}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;