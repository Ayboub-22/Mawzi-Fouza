import "./PopupAddProduct.css";
import logo from '../../src/assets/icons/logo.png';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface PopupAddProductProps {
  show: boolean; // Pour contrôler la visibilité de la popup
}


const PopupAddProduct: React.FC<PopupAddProductProps> = ({ show }) => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };
  const [name, setName] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [designation, setDesignation] = useState("");
  const [img_path, setImg_path] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  if (!show) return null; // Ne rien afficher si `show` est false
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

    // Création de l'objet de l'offre
    const productData = {
     
      name: name,      
      categorie: categorie, 
      prix: prix,
      designation: designation,
      img_path: img_path
    };
    try {
      // Envoi de la requête pour ajouter un article
      const response = await axios.post("http://localhost:3000/article/addArticle", productData);

      if (response.status === 201) {
        console.log("Product added successfully:", response.data);
        setCategorie("");
        setName("");
        setPrix("");
        setDesignation("");
        setImg_path("");
      } else {
        console.log("Failed to add product.");
        setErrorMessage("Failed to add product.");
      }
    } catch (error: any) {
      console.error("Add product error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred while adding the product.");
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleRefresh}>
          X
        </button>
        <div className="Head">

          <img src={logo} alt="Logo" className="logo1" />
        </div>
        <form className="product-form" onSubmit={handleAddProduct}>
          {/* Ligne avec Product Name et Category */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Name:</label>
              <input type="text" placeholder="Enter product name" value={name}
              onChange={(e) => setName(e.target.value)}
              required />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input type="text" placeholder="Enter category" value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required />
            </div>
          </div>

          {/* Ligne avec Price  */}
          <div className="form-row">
            <div className="form-group">
              <label>Price:</label>
              <input type="number" placeholder="Enter price" value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required />
            </div>
          </div>

          {/* Ligne avec Description */}
          <div className="form-row">
            <div className="form-group">
              <label>Description:</label>
              <textarea placeholder="Enter product description" rows={4} value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required ></textarea>
            </div>
          </div>

          {/* Ligne avec Image */}
          <div className="form-row">
            <div className="form-group">
              <label>Image:</label>
              <input type="file" accept="image/*" value={img_path}
              onChange={(e) => setImg_path(e.target.value)}
              required />
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Affichage des erreurs */}
          {/* Bouton d'ajout */}
          <div className="button-container">
            <button type="submit" className="add-product-button1">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupAddProduct;
