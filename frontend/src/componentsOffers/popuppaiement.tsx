import React, { useState } from "react";
import logo from "../components/logo.png";
import "./popuppaiement.css";
import { useNavigate } from "react-router-dom";

interface PopupProps {
  onClose: () => void; // Fonction pour fermer la popup principale
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // État pour la popup de succès

  // Gérer le clic sur le bouton "Pay"
  const handlePayment = () => {
    // Vérifiez si les champs sont remplis avant de valider
    if (number.length === 8 && code.length === 4) {
      setShowSuccessPopup(true); // Affiche la popup de succès
    } else {
      alert("Please fill the form correctly.");
    }
  };

  // Gérer la fermeture des deux popups
  const closeBothPopups = () => {
    setShowSuccessPopup(false);
    onClose(); // Fermer la popup principale
  };

  return (
    <>
      {/* Première popup */}
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="Head">
            <img src={logo} alt="Logo" className="logo1" />
          </div>
          <h2>Make a payment</h2>
          <form className="paiementform">
            <div className="form-group">
              <label htmlFor="cardNumber">Card number (8 numbers)</label>
              <input
                type="text"
                id="cardNumber"
                maxLength={8}
                placeholder="12345678"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardCode">Card code (4 numbers)</label>
              <input
                type="password"
                id="cardCode"
                maxLength={4}
                placeholder="****"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="div_pay">
              <button
                type="button"
                className="pay-button"
                onClick={handlePayment}>
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Deuxième popup pour afficher le message de succès */}
      {showSuccessPopup && (
        <div className="popup-overlay" onClick={closeBothPopups}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="close2">
            <button className="close-button" onClick={closeBothPopups}>
              X
            </button>
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your payment.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
