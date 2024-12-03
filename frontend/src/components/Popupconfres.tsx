import React from "react";
import { useNavigate } from "react-router-dom"; // Import du hook pour la navigation
import "./Popupconfres.css";

interface PopupconfresProps {
  onConfirm: () => void; // Pour ouvrir la popup de réservation
}

const Popupconfres: React.FC<PopupconfresProps> = ({ onConfirm }) => {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const handleCancel = () => {
    navigate("/"); // Redirige vers la page d'accueil
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Do you want to reserve again?</h2>
        <div className="popup-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popupconfres;
