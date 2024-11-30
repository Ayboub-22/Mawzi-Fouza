import "./AdminOffers.css";
import NavAdmin from"../componentsAdmin/NavAdmin";
import PopupOffer from "./PopupOffer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminOffers: React.FC = () => {
  const navigate = useNavigate();
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
            <button className="logout-button" onClick={() => navigate("/")}>Logout</button>

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
                <tr key={offer.id} className="table-row">

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