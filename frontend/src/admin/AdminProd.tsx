import React, { useState, useEffect } from "react";
import "./AdminProd.css";
import { useNavigate } from "react-router-dom";
import modify from '../assets/icons/edit.png';
import dele from '../assets/icons/delete.png';
import PopupAddProduct from "./PopupAddProduct";
import PopupModifyProduct from "./PopupModifyProduct";
import PopupConfirmDelete from "./PopupConfirmDelete"; // Import de la popup de confirmation
import NavAdmin from "../componentsAdmin/NavAdmin";
import axios from "axios"; // Import Axios pour les requêtes HTTP
type Product = {
  id: number;
  name: string;
  designation: string;
  price: string;
  category: string;
};  //pour le typescript

const AdminProd: React.FC = () => {

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState<number | null>(null); // Pop-up pour chaque produit
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Nouveau state pour la pop-up de confirmation de suppression
  const [productToDelete, setProductToDelete] = useState<number | null>(null); // ID du produit à supprimer
  const [products, setProducts] = useState<Product[]>([]);  //pour le TS
 // Initialisé comme tableau vide
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/article/"); // URL du backend
        const transformedProducts = response.data.map((article: any) => ({
          id: article.id, // Colonne 'id' dans la base
          name: article.name, // Colonne 'nom' (français)
          designation: article.designation, // Colonne 'designation' (français)
          price: `${article.prix} DT`, // Colonne 'prix' (français)
          category: article.categorie, // Colonne 'categorie' (français)
        }));
        setProducts(transformedProducts); // Mise à jour des produits
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts(); // Appel de la fonction lors du montage
  }, []); // Effectue la requête une seule fois au montage du composant
  
  
  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleModifyPopup = (id: number) => {
    setShowModifyPopup(id);
  };
  const handleCloseModifyPopup = () => {
    setShowModifyPopup(null);
  };

  // const initialProducts = [
  //   { id: 1, name: "Whey Protein Mexico", designation: "WPM", price: "90,000 DT", category: "protein supplements" },
  //   { id: 2, name: "Vegan Protein Powder", designation: "VPP", price: "60,000 DT", category: "protein supplements" },
  //   { id: 3, name: "Organic Protein Powder", designation: "OPP", price: "70,000 DT", category: "protein supplements" },
  //   { id: 4, name: "T-shirt", designation: "TSH", price: "30,000 DT", category: "gym wear" },
  //   { id: 5, name: "Gym Tank Top", designation: "GTT", price: "70,000 DT", category: "gym wear" },
  //   { id: 6, name: "Gloves", designation: "GLV", price: "40,000 DT", category: "equipments and accessories" },
  //   { id: 7, name: "Gym Belt", designation: "GBL", price: "50,000 DT", category: "equipments and accessories" },
  //   { id: 8, name: "Gym Bag", designation: "GBG", price: "120,000 DT", category: "equipments and accessories" },
  // ];

  //const [products, setProducts] = useState(initialProducts);

  const handleDelete = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);  // Réinitialiser l'ID après la suppression
      setShowDeletePopup(false); // Fermer la pop-up après suppression
    }
  };

  const openDeletePopup = (id: number) => {
    setProductToDelete(id); // Définir le produit à supprimer
    setShowDeletePopup(true); // Ouvrir la pop-up de confirmation
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false); // Fermer la pop-up sans supprimer
    setProductToDelete(null); // Réinitialiser l'ID du produit
  };

  return (
    <div className="admin-container">

      <NavAdmin />
      <div className="admin-content">
        <div className="part1">
          <h1>Products</h1>
          <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
        </div>

        <div className="tablepad">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>NAME</th>
                <th>DESIGNATION</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="table-row">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.designation}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="div-category">
                      <div className="div-prod">{product.category}</div>
                      <div className="d-span">
                        <span className="d-icon">
                          <img
                            className="d-icon-img"
                            src={modify}
                            onClick={() => handleModifyPopup(product.id)}
                          />
                          {showModifyPopup === product.id && (
                            <PopupModifyProduct show={true} onClose={handleCloseModifyPopup} />
                          )}
                        </span>
                        <span className="d-icon">
                          <img
                            className="d-icon-img"
                            src={dele}
                            onClick={() => openDeletePopup(product.id)} // Ouvrir la pop-up de suppression
                          />
                        </span>
                      </div>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="addprodpad">
          <button className="add-product-button" onClick={handleOpenPopup}>Add product</button>
          <PopupAddProduct show={showPopup} onClose={handleClosePopup} />
        </div>
      </div>

      {/* Pop-up de confirmation de suppression */}
      {showDeletePopup && (
        <PopupConfirmDelete 
          onConfirm={handleDelete} 
          onCancel={closeDeletePopup} // Fermer la pop-up sans supprimer
        />
      )}
    </div>
  );
};

export default AdminProd;
