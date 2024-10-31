import React from 'react';
import '../../styles/common/card.css';

const Card = ({ title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h1>{title}</h1>
    </div>
  );
};

export default Card;