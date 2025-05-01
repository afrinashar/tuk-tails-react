import React from 'react';
import './Loader.css';  
const Loader = () => {
  return (
  <><div className="loader">
      <div className="spinner"></div>
      <div className="loading-text">
      Loading<span className="dots">...</span>
    </div>
    </div></>  
  );
};

export default Loader;
