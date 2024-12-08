import React, { useState } from "react";
import logo from "../components/logo.png";
import "./popuppaiement.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PopupProps {
  onClose: () => void; // Fonction pour fermer la popup principale
  userCin1:any;
  id_offre:any;
}

const Popup: React.FC<PopupProps> = ({ onClose ,userCin1,id_offre }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // État pour la popup de succès

  // Gérer le clic sur le bouton "Pay"
  const handlePayment = async () => {
    // Vérifiez si les champs sont remplis avant de valider
    if (number.length === 8 && code.length === 4) {


      //ICI JE VAIS VERIFIER SI LE MEMBRE DONT LE CIN EST 
      //userCin1 est adherent ou non 

      try {
        // Passez le CIN de l'utilisateur à l'API pour vérifier son statut d'adhérent
        const response = await axios.post('http://localhost:3000/membre/reservation', { cin: userCin1 }); // Assurez-vous de passer le CIN dans la requête
    
        const { adherent } = response.data;
    
        if (adherent) {
          alert("vous avez deja un abonnement qui est encore valide");
         // Affichez le popup vous avez deja un abonnement valide et puis fermerture des 2 popups
         onClose();
        } else {
          const today=new Date();
          try{
          const response1 = await axios.post('http://localhost:3000/abonnement/acceptReservation', { 
            date_debut: today, 
            userId: userCin1, 
            offreId: id_offre  
          });
          setShowSuccessPopup(true);
        }
        catch(error:any){
          alert("une erreur s'est produite lors de l'ajout de l'offre");
        }
        }
      } catch (error:any) {
        console.error("Erreur lors de la vérification :", error);
      }

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
                type="number"
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
