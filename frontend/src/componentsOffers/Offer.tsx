import { useEffect, useState } from "react";
import Card from "./Card";
import "./Offer.css";

interface card2 {
  plan: string;
  prix: string;
  type: string;
  info: string;
  list: string[];
}

type offersprops = {
  cards: card1[];
};
interface card1 {
  id_offre: number; // Primary Key, auto-increment
  durée: number; // Duration (assumed in days, months, etc.)
  prix: number; // Price with up to two decimal points
  validite: boolean;
}

function Offer() {
  const [cards1, setcards] = useState<card1[]>([]);
  const L = [
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
    "Lorem ipsum dolor sit amet, ",
  ];
  const plan = "Premium  Plan";
  const info =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ";

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:3000/Offre/get") // Update the URL based on your setup
      .then((response) => response.json())
      .then((data) => setcards(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="Offer">
      <div className="msg">JOIN TODAY</div>

      <div className="Cards">
        {cards1.map((item, index) => (
          <Card
            key={index}
            plan={plan}
            prix={`$${item.prix}`}
            type={`${item.durée}Month`}
            info={info}
            list={L}
          />
        ))}
      </div>
    </div>
  );
}

export default Offer;
