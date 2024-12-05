import "./AdminOffers.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import PopupOffer from "./PopupOffer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Offer {
  id: number;
  duration: string;
  price: string;
  activated: boolean;
}

const AdminOffers: React.FC = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]); // State pour stocker les offres
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);

  // Fonction pour récupérer les offres depuis l'API
  const handleFetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Offre");
      const formattedOffers = response.data.map((offer: any) => ({
        id: offer.id_offre,
        duration: offer.durée,
        price: offer.prix,
        activated: offer.validité,
      }));
      setOffers(formattedOffers);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  useEffect(() => {
    handleFetchOffers();
  }, []);

  // Fonction pour gérer la modification de la checkbox
  const handleCheckboxChange = async (id: number, currentState: boolean) => {
    try {
      const updatedState = !currentState;

      // Envoyer une requête PUT au backend
      await axios.put(`http://localhost:3000/Offre/${id}/validity`, {
        validité: updatedState, // Correspond au champ attendu par le backend
      });

      // Mettre à jour l'état localement
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === id ? { ...offer, activated: updatedState } : offer
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Failed to update the validity. Please try again.");
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <NavAdmin />
      <div className="admin-content">
        <div className="part1">
          <h1>Offers</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
                      onChange={() => handleCheckboxChange(offer.id, offer.activated)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="addoffpad">
          <button className="add-offer-button" onClick={handleOpenPopup}>
            Add offer
          </button>
        </div>
        <PopupOffer show={showPopup} />
      </div>
    </div>
  );
};

export default AdminOffers;
