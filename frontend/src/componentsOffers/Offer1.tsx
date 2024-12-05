import { useEffect, useState } from "react";
import Card from "./Card";
import "./Offer.css";
import Popuppaiement from "./popuppaiement";

interface card1 {
  id_offre: number;
  durée: number;
  prix: number;
  validite: boolean;
}

function Offer() {
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
      <div className="msg">JOIN TODAY</div>

      <div className="Cards">
        {cards1.map((item) => (
          <div key={item.id_offre} onClick={() => openPopup(item)}>
            <Card
              plan="Premium Plan"
              prix={`$${item.prix}`}
              type={`${item.durée} Month`}
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              list={["Lorem", "ipsum", "dolor", "sit", "amet"]}
            />
          </div>
        ))}
      </div>

      {isPopupOpen && <Popuppaiement onClose={closePopup} />}
      
    </div>
  );
}

export default Offer;
