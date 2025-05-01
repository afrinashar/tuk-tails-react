import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard.jsx';
import './Catalogue.css';
import Loader from './Loader.jsx';

const Catalogue = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://tuk-tails-node.onrender.com/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);
console.log(items,"items");

  return (
    <div className="catalogue-container">
      <h1 className='logo' >TUK TAILS</h1>
      {/* <p>Style Simplified</p> */}
      <div className="catalogue-grid">
        {  items ? items.map(item => <ItemCard key={item._id} item={item} />):<Loader/>}
      </div>
    </div>
  );
};

export default Catalogue;