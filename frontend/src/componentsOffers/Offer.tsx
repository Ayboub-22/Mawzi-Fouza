import { useEffect, useState } from "react";
import Card from "./Card"; // Assurez-vous que votre composant Card est correctement importé
import "./Offer.css";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../components/PopupContext";

interface CardData {
  id_offre: number; // Identifiant unique
  durée: number; // Durée (en mois par exemple)
  prix: number; // Prix avec deux décimales
  validite: boolean; // Statut de validité
}

function Offer() {
  const { togglePopup } = usePopup();
  const [cards1, setCards] = useState<CardData[]>([]); // Déclarez l'état pour stocker les données des offres
  const listItems = [
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
  ];
  const plan = "Premium Plan";
  const info =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ";

  useEffect(() => {
    // Effectuez une requête pour récupérer les données
    fetch("http://localhost:3000/Offre/get") // Remplacez l'URL si nécessaire
      .then((response) => response.json())
      .then((data) => setCards(data)) // Stockez les données dans l'état
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);

  return (
    <div className="Offer">
      <div className="OffersTitle">JOIN TODAY</div>
      <div className="Cards">
        {cards1.map((item) => (
          <div key={item.id_offre} onClick={togglePopup}>
          <Card
            key={item.id_offre} // Utilisez un identifiant unique comme clé
            plan={plan}
            prix={`$${item.prix}`} // Format du prix
            type={`${item.durée} Month`} // Format de la durée
            info={info}
            list={listItems} // Liste des caractéristiques
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
