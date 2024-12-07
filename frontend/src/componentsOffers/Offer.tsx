import Card from "./Card";
import "./Offer.css";

interface card1 {
  plan: string;
  prix: string;
  type: string;
  info: string;
  list: string[];
}

type offersprops = {
  cards: card1[];
};

function Offer() {
  const cards = [
    {
      plan: "Premium  Plan",
      prix: "$15",
      type: " Month",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ",
      list: [
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
      ],
    },
    {
      plan: "Premium  Plan",
      prix: "$15",
      type: " Month",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ",
      list: [
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
      ],
    },
    {
      plan: "Premium  Plan",
      prix: "$15",
      type: " Month",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ",
      list: [
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
        "Lorem ipsum dolor sit amet, ",
      ],
    },
  ];
  return (
    <div className="Offer">
      <div className="OffersTitle">JOIN TODAY</div>
      <div className="Cards">
        {cards.map((item, index) => (
          <Card
            key={index}
            plan={item.plan}
            prix={item.prix}
            type={item.type}
            info={item.info}
            list={item.list}
          />
        ))}
      </div>
    </div>
  );
}

export default Offer;
