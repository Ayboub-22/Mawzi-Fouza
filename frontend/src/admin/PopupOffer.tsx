import React from "react";
import "./PopupOffer.css";
import logo from "../components/logo.png";

interface PopupOfferProps {
  show: boolean; // Pour contrôler la visibilité de la popup
  onClose: () => void; // Fonction pour fermer la popup
}

const PopupOffer: React.FC<PopupOfferProps> = ({ show, onClose }) => {
  if (!show) return null; // Ne rien afficher si `show` est false

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="Head">
        <img src={logo} alt="Logo" className="logo1" />
        </div>
        <div className="div_offerform"><form className="offerform">
          <div className="label"><label>Duration:</label></div>
          <input type="text" placeholder="Enter duration" />
          <div className="label"><label>Price:</label></div>
          <input type="text" placeholder="Enter price" />
          
        </form></div>
        <div className="div_addoffer"><button type="submit" className="addoffer" >Add Offer</button></div>
        
      </div>
    </div>
  );
};

export default PopupOffer;


















// import "./PopupOffer.css";
// import { usePopup } from "../components/PopupContext";

// import { useNavigate } from "react-router-dom";



// function PopupOffer() {

//   const navigate = useNavigate(); // Hook pour naviguer vers une autre route

  

//   const {
//     isMember,
//     changeStatus1,
//     changeStatus2,
//     isPopup1Visible,
//     togglePopup1,
//     isPopupVisible,
//     closePopup,
//     closePopup1,
//   } = usePopup();

//   if (!isPopupVisible) return null;

//   return (
//     <div className="PopUp">
//       <div className="Form">
//         <button
//           className="close-button"
//           onClick={closePopup}
//           aria-label="Close popup"
//         >
//           ✕
//         </button>
//         <div className="Head">
//           <img src="./Logo.png" alt="logo" />
//         </div>
//         <div className="Form1">
//           <form className="sign-in-form">
//             <label>Duration</label>
//             <input type="text" id="email" placeholder="duration" required />

//             <label>Price</label>
//             <input type="text" id="password" placeholder="price" required />


//             <button type="submit" className="submit-button" >     {/*onclick={}*/}   
//               Add offer
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default PopupOffer;
