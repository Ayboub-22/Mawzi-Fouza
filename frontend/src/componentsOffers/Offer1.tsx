import { useEffect, useState } from "react";
import Card from "./Card";
import "./Offer.css";
import Popuppaiement from "./popuppaiement";
import { useLocation, useNavigate } from "react-router-dom";

interface card1 {
  id_offre: number;
  durée: number;
  prix: number;
  validite: boolean;
  description: string; // Description contenant une phrase suivie de privilèges
  type: string; // Type d'offre
}

function Offer({ userCin1}:any) {

  const navigate = useNavigate();
  const location = useLocation();
  const [idOffre, setIdOffre] = useState<number | null>(null); // État pour stocker id_offre

  const [cards1, setcards] = useState<card1[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // État pour gérer la popup
  const [selectedCard, setSelectedCard] = useState<card1 | null>(null); // L'offre sélectionnée pour la popup

  useEffect(() => {
    fetch("http://localhost:3000/Offre/get")
      .then((response) => response.json())
      .then((data) => setcards(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  // Fonction pour ouvrir la popup et stocker l'offre sélectionnée
  const openPopup = (card: card1) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };

  // Fonction pour fermer la popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCard(null); // Réinitialise l'offre sélectionnée
  };

  return (
    <div className="Offer">
      <div className="OffersTitle">JOIN TODAY</div>

      <div className="Cards">
        {cards1.map((item) => {
          // Extraire la phrase et les privilèges depuis la description
          const [phrase, privileges] = item.description.split(":");
          const listItems = privileges ? privileges.split(",") : [];

          // Convertir `prix` en nombre si nécessaire
          const prix =
            typeof item.prix === "string" ? parseFloat(item.prix) : item.prix;
          return(
          <div key={item.id_offre} onClick={() => {setIdOffre(item.id_offre); openPopup(item)}}>
            <Card
              key={item.id_offre} // Utilisez un identifiant unique comme clé
              plan={item.type} // Utiliser l'attribut "type" pour le plan
              prix={`$${prix.toFixed(2)}`} // Format du prix
              type={`${item.durée} Month`} // Format de la durée
              info={phrase} // Utiliser la phrase comme description
              list={listItems} // Utiliser les privilèges comme liste
            />
          </div>);
        })}
      </div>

      {isPopupOpen && 
      <Popuppaiement 
        onClose={closePopup}
        userCin1={userCin1} 
        id_offre={idOffre}
      />}
      
    </div>
  );
}

export default Offer;
