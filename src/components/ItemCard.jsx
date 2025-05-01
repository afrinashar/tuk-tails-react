import React from 'react';
import './ItemCard.css';
 const ItemCard = ({ item }) => {
  const imageUrl = `https://tuk-tails-node.onrender.com/uploads/${item.image}`;

  return (
    <div className="item-card">
      <img src={imageUrl} alt={item.name} className="item-image" style={{
    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
    transition: 'transform 0.3s ease',
  }}
  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
 />
      <div className="item-info">
        <h2 style={{fontFamily:"'Pacifico', cursive"}}>{item.name}</h2>
        <p>{item.description}</p>
        <p className="price">Rs:{item.amount}</p>
        <a
  href={imageUrl}
  download
  className="download-link"
  aria-label="Download the image"
>
 D
</a>

      </div>
    </div>
  );
};

export default ItemCard;
