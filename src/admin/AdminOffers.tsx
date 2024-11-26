// import React, { useState, useEffect } from "react";
// import "./AdminOffers.css";
// import NavAdmin from "../componentsAdmin/NavAdmin";
// import { getAllOffers } from "../BackEnd/models/offerModel"; // Vérifiez le chemin

// interface Offer {
//   id_offer: number;
//   duration: string;
//   price: string;
//   activated: boolean;
// }

// const AdminOffers: React.FC = () => {
//   // État pour stocker les offres récupérées
//   const [offers, setOffers] = useState<Offer[]>([]);

//   // Charger les offres à partir de la base de données
//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const data = await getAllOffers(); // Appelle la fonction du modèle
//         setOffers(data); // Met à jour l'état avec les données récupérées
//       } catch (error) {
//         console.error("Erreur lors de la récupération des offres :", error);
//       }
//     };

//     fetchOffers();
//   }, []); // Dépendances vides pour ne l'exécuter qu'une fois

//   return (
//     <div className="admin-container">
//       {/* Barre de navigation */}
//       <NavAdmin />

//       {/* Contenu principal */}
//       <div className="admin-content">
//         <div className="part1">
//           <h1>Offers</h1>
//           {/* Bouton pour se déconnecter */}
//           <button className="logout-button">Logout</button>
//         </div>

//         {/* Tableau des offres */}
//         <div className="tablepad">
//           <table className="offers-table">
//             <thead>
//               <tr>
//                 <th>ID_OFFER</th>
//                 <th>DURATION</th>
//                 <th>PRICE</th>
//                 <th>ACTIVATED</th>
//               </tr>
//             </thead>
//             <tbody>
//               {offers.map((offer) => (
//                 <tr key={offer.id_offer}>
//                   <td>{offer.id_offer}</td>
//                   <td>{offer.duration}</td>
//                   <td>{offer.price}</td>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={offer.activated}
//                       readOnly
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bouton pour ajouter une offre */}
//         <div className="addoffpad">
//           <button className="add-offer-button">Add offer</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOffers;
import "./AdminOffers.css";
import NavAdmin from"../componentsAdmin/NavAdmin";
import PopupOffer from "./PopupOffer";
import { useState } from "react";

const AdminOffers: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
    // Données des offres simulées
    const offers = [
      { id: 1, duration: "1 month", price: "150 DT", activated: false },
      { id: 2, duration: "3 months", price: "400 DT", activated: true },
      { id: 3, duration: "6 months", price: "750 DT", activated: false },
      { id: 4, duration: "12 months", price: "1350 DT", activated: true },
      { id: 5, duration: "1 month", price: "160 DT", activated: true },
      { id: 6, duration: "6 months", price: "730 DT", activated: false },
    ];
  
    return (
      <div className="admin-container">
        {/* Barre de navigation */}
        <NavAdmin />
  
        {/* Contenu principal */}
        <div className="admin-content">
          <div className="part1">
            <h1>Offers</h1>
            {/* Bouton pour se déconnecter */}
            <button className="logout-button">Logout</button>
          </div>
          
          {/* Tableau des offres */}
          <div className="tablepad">
          <table className="offers-table">
            <thead>
              <tr>
                <th>ID_OFFER</th>
                <th>DURATION</th>
                <th>PRICE</th>
                <th>ACTIVATED</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.id}</td>
                  <td>{offer.duration}</td>
                  <td>{offer.price}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={offer.activated}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
  
          {/* Bouton pour ajouter une offre */}
          <div className="addoffpad"><button className="add-offer-button" onClick={handleOpenPopup} >Add offer</button></div>
          {/* Affichage de la popup */}
        <PopupOffer show={showPopup} onClose={handleClosePopup} />
        </div>
      </div>
    );
  };
  
  export default AdminOffers;