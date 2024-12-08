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

  const [groupedArticles, setGroupedArticles] = useState<
    Record<string, Article[]>
  >({});

  useEffect(() => {
    // Récupérer les articles depuis le backend
    fetch("http://localhost:3000/article/") // Remplacez l'URL selon votre configuration
      .then((response) => response.json())
      .then((data: Article[]) => {
        // Grouper les articles par catégorie
        const grouped = data.reduce((acc, article) => {
          if (!acc[article.categorie]) {
            acc[article.categorie] = [];
          }
          acc[article.categorie].push(article);
          return acc;
        }, {} as Record<string, Article[]>);
        setGroupedArticles(grouped);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []); // Exécuté une fois au montage

  return (
    <div className="Products">
      <h2>Explore Our Products</h2>
      {Object.entries(groupedArticles).map(([category, articles]) => (
        <div key={category} className="ProductCategory">
          {" "}
          {/* Titre de la catégorie */}
          <ProductList
            cardsData={articles.map((article) => ({
              image: article.img_path.replace("C:\\fakepath\\", ""),
              text: article.name,
              label: `${article.prix}`, // Affichage du prix formaté
            }))}
            title={` ${category}`} // Titre dynamique
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
