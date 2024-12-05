import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import "./Products.css";

function Products() {
  interface Article {
    id: number;
    name: string;
    designation: string;
    prix: string;
    categorie: string;
    img_path: string;
  }
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:3000/article/") // Update the URL based on your setup
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="Products">
      <ProductList
        cardsData={articles.map((article) => ({
          image: article.img_path.replace("C:\\fakepath\\", ""),
          text: article.name,
          label: article.prix,
        }))}
        title="Dynamic Product List"
      />
    </div>
  );
}

export default Products;
