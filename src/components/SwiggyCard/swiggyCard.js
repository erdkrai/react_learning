import React from 'react';
import './swiggyCard.css';

const VegIcon = () => (
  <div className="food-icon veg">
    <div className="icon-outline">
      <div className="icon-dot"></div>
    </div>
  </div>
);

const NonVegIcon = () => (
  <div className="food-icon non-veg">
    <div className="icon-outline">
      <div className="icon-dot"></div>
    </div>
  </div>
);

const SwiggyCard = ({ item }) => {
  return (
    <div className="swiggy-card">
      <div className="card-content">
        <div className="card-info">
          <div className="card-header">
            {item.isVeg ? <VegIcon /> : <NonVegIcon />}
            {item.isBestseller && <span className="bestseller-tag">⭐ Bestseller</span>}
          </div>
          <h3>{item.name}</h3>
          <p className="price">₹{item.price}</p>
          <p className="description">{item.description}</p>
          {item.isCustomizable && <p className="customizable">Customisable</p>}
        </div>
        <div className="card-image">
          <img src={item.image} alt={item.name} />
          <button className="add-btn">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default SwiggyCard; 