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
      // Effectuer la requête API pour récupérer les offres
      const response = await axios.get("http://localhost:3000/Offre");

      // Mapper les données pour les adapter à votre format attendu
      const formattedOffers = response.data.map((offer: any) => ({
        id: offer.id_offre,        // Changer "id_offre" en "id"
        duration: offer.durée,     // Changer "durée" en "duration"
        price: offer.prix,         // Changer "prix" en "price"
        activated: offer.validité, // Changer "validité" en "activated"
      }));

      // Mettre à jour l'état avec les offres formatées
      setOffers(formattedOffers);       //on a copié dans offers le contenu de formattedOffers
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  // Utilisation de useEffect pour récupérer les offres au chargement du composant
  useEffect(() => {
    handleFetchOffers(); // Appeler la fonction de récupération des offres au chargement du composant
  }, []);

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    // Logique de déconnexion ici (par exemple vider un token)
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Offers</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
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
        <div className="addoffpad">
          <button className="add-offer-button" onClick={handleOpenPopup}>
            Add offer
          </button>
        </div>
        <PopupOffer
          show={showPopup}
        />
      </div>
    </div>
  );
};

export default AdminOffers;
