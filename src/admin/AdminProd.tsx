import "./AdminProd.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useState } from "react";

const AdminProd: React.FC = () => {
  // Données des produits simulées
  const initialProducts = [
    { id: 1, name: "Whey Protein Mexico", designation: "WPM", price: "90,000 DT", category: "PROTEIN SUPPLEMENTS" },
    { id: 2, name: "Vegan Protein Powder", designation: "VPP", price: "60,000 DT", category: "PROTEIN SUPPLEMENTS" },
    { id: 3, name: "Organic Protein Powder", designation: "OPP", price: "70,000 DT", category: "PROTEIN SUPPLEMENTS" },
    { id: 4, name: "T-shirt", designation: "TSH", price: "30,000 DT", category: "GYM WEAR" },
    { id: 5, name: "Gym Tank Top", designation: "GTT", price: "70,000 DT", category: "GYM WEAR" },
    { id: 6, name: "Gloves", designation: "GLV", price: "40,000 DT", category: "EQUIPMENTS AND ACCESSORIES" },
    { id: 7, name: "Gym Belt", designation: "GBL", price: "50,000 DT", category: "EQUIPMENTS AND ACCESSORIES" },
    { id: 8, name: "Gym Bag", designation: "GBG", price: "120,000 DT", category: "EQUIPMENTS AND ACCESSORIES" },
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Products</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button">Logout</button>
        </div>

        {/* Tableau des produits */}
        <div className="tablepad">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>NAME</th>
                <th>DESIGNATION</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.designation}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton pour ajouter un produit */}
        <div className="addprodpad">
          <button className="add-product-button">Add product</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProd;

