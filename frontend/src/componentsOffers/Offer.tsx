import { useEffect, useState } from "react";
import Card from "./Card"; // Assurez-vous que votre composant Card est correctement importé
import "./Offer.css";
import { usePopup } from "../components/PopupContext";

interface CardData {
  id_offre: number; // Identifiant unique
  durée: number; // Durée (en mois par exemple)
  prix: number | string; // Prix (peut être une chaîne ou un nombre)
  validite: boolean; // Statut de validité
  description: string; // Description contenant une phrase suivie de privilèges
  type: string; // Type d'offre
}

function Offer() {
  const { togglePopup } = usePopup();
  const [cards1, setCards] = useState<CardData[]>([]); // Déclarez l'état pour stocker les données des offres

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
        {cards1.map((item) => {
          // Extraire la phrase et les privilèges depuis la description
          const [phrase, privileges] = item.description.split(":");
          const listItems = privileges ? privileges.split(",") : [];

          // Convertir `prix` en nombre si nécessaire
          const prix =
            typeof item.prix === "string" ? parseFloat(item.prix) : item.prix;

          return (
            <div key={item.id_offre} onClick={togglePopup}>
              <Card
                key={item.id_offre} // Utilisez un identifiant unique comme clé
                plan={item.type} // Utiliser l'attribut "type" pour le plan
                prix={`$${prix.toFixed(2)}`} // Format du prix
                type={`${item.durée} Month`} // Format de la durée
                info={phrase} // Utiliser la phrase comme description
                list={listItems} // Utiliser les privilèges comme liste
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Offer;
