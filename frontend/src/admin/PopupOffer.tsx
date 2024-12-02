import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PopupOffer.css";
import logo from "../components/logo.png";
import axios from "axios";

interface PopupOfferProps {
  show: boolean;
}

const PopupOffer: React.FC<PopupOfferProps> = ({ show /*onClose, onOfferAdded*/ }) => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };


  const [durée, setDuration] = useState("");
  const [prix, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) return null; // Ne rien afficher si `show` est false

  // Fonction pour gérer l'ajout de l'offre
  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

    // Création de l'objet de l'offre
    const offerData = {
     
      prix: prix,      // Valeur du prix
      durée: durée, // Valeur de la durée
      validité: true
    };

    try {
      // Envoi de la requête pour ajouter une offre
      const response = await axios.post("http://localhost:3000/Offre/addOffer", offerData);

      if (response.status === 201) {
        console.log("Offer added successfully:", response.data);
        setDuration("");
        setPrice("");
      } else {
        console.log("Failed to add offer.");
        setErrorMessage("Failed to add offer.");
      }
    } catch (error: any) {
      console.error("Add offer error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred while adding the offer.");
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
        <form className="offerform" onSubmit={handleAddOffer}>
          <div className="div_offerform">
            <div className="label">
              <label>Duration:</label>
            </div>
            <input
              type="text"
              placeholder="Enter duration"
              value={durée}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            <div className="label">
              <label>Price:</label>
            </div>
            <input
              type="text"
              placeholder="Enter price"
              value={prix}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Affichage des erreurs */}
          <div className="div_addoffer">
            <button type="submit" className="addoffer" >
              Add Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupOffer;
