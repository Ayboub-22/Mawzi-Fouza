import "./Figures.css";

// Define the prop types for the Card component
interface CardProps {
  title: string;
  text: string;
}

// Card component with typed props
function Card({ title, text }: CardProps) {
  return (
    <div className="cardFigures">
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
function Figures() {
  const cardData = [
    { title: "500+", text: "Happy Members <br/>Our community is growing fast" },
    {
      title: "5+",
      text: "Year Experience <br/>Experience in various workouts",
    },
    { title: "13+", text: "Certified Trainers <br/>Guidance at every step" },
    {
      title: "90%",
      text: "Customer Satisfaction <br/>We ensure your progress satisfaction",
    },
  ];

  return (
    <div className="card-container">
      {cardData.map((item, index) => (
        <Card key={index} title={item.title} text={item.text} />
      ))}
    </div>
  );
}
export default Figures;
