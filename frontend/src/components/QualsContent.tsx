import React from "react";
import "./QualsContent.css";

// Define the props for this component
interface QualsContentProps {
  title: string;
  description: string;
  imageSrc: string;
}

const QualsContent: React.FC<QualsContentProps> = ({
  title,
  description,
  imageSrc,
}) => {
  return (
    <div className="Quals-Content">
      <div>
        <img src={imageSrc} alt="icon" className="title-image" />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default QualsContent;
