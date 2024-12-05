import "./Card.css";

interface card1 {
  plan: string;
  prix: string;
  type: string;
  info: string;
  list: string[];
}

const Card = ({ plan, prix, type, info, list }: card1) => {
 
  return (
    <div className="plan">
      <div className="inner">
        <h1 className="titl">{plan}</h1>
        <span className="pricing1">
          <span className="pri">
            {prix}
            <small>/{type}</small>
          </span>
        </span>

        <p className="info">{info}</p>
        <ul className="features">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="action">
          <a className="button">
            Choose plan
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
