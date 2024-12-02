import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PopupModifyProduct.css";
import logo from "../../src/assets/icons/logo.png";
import axios from "axios";

interface PopupModifyProductProps {
  show: boolean;
  onClose: () => void;
  product: any; // Les données du produit sélectionné
}

const PopupModifyProduct: React.FC<PopupModifyProductProps> = ({ show, product }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };

  const [formData, setFormData] = useState({
    name: "",
    categorie: "",
    prix: "",
    designation: "",
  });

  useEffect(() => {
    if (product) {
      // Remplir les champs avec les données du produit sélectionné
      setFormData({
        name: product.name || "",
        categorie: product.categorie || "",
        prix: product.prix || "",
        designation: product.designation || "",
      });
    }
  }, [product]);

  if (!show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Mapper les noms de champs avec les clés de l'état formData
    const mappedName =
      name === "category" ? "categorie" :
      name === "price" ? "prix" :
      name === "description" ? "designation" :
      name;

    setFormData((prev) => ({ ...prev, [mappedName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/article/${product.id}`,formData);
      if (response.status === 200) {
        console.log("Article updated successfully:", response.data);
      } else {
        console.log("Failed to update article.");
      }
    } catch (error: any) {
      console.error("Update article error:", error.response?.data || error.message);
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
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.categorie}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.prix}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.designation}
                onChange={handleInputChange}
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="add-product-button1">
              Modify Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupModifyProduct;