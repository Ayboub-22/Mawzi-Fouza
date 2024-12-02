// CardList.tsx
import React from "react";
import "./ProductList.css";

interface CardProps {
  image: string;
  text: string;
  label: string;
}

interface CardListProps {
  cardsData: CardProps[];
  title: string;
}

const ProductList: React.FC<CardListProps> = ({ cardsData, title }) => {
  return (
    <div className="ProductList">
      <h1>{title}</h1>
      <div className="card-elements">
        {cardsData.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt="card" />
            <div className="card-content">
              <p>{card.text}</p>
              <div className="card-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
