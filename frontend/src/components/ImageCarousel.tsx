import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageCarousel.css";

interface ImageData {
  src: string;
  text: string;
}

const ImageCarousel: React.FC = () => {
  const images: ImageData[] = [
    { src: "kickboxing.jpg", text: "Kick Boxing" },
    { src: "natation.png", text: "Swimming" },
    { src: "gymnastique.jpg", text: "Gymnastic" },
    { src: "Bodypump.jpg", text: "Body Pump" },
    { src: "bodycombat.jpeg", text: "Body Combat" },
    { src: "crosstraining.jpg", text: "Cross Training" },
    { src: "yoga1.png", text: "YOGA" },
  ];

  const [centerIndex, setCenterIndex] = useState(1);

  const getIndices = () => {
    const prevIndex = (centerIndex - 1 + images.length) % images.length;
    const nextIndex = (centerIndex + 1) % images.length;
    return [prevIndex, centerIndex, nextIndex];
  };

  const handleClick = (index: number) => {
    setCenterIndex(index);
  };

  const [prevIndex, currentIndex, nextIndex] = getIndices();

  return (
    <div className="carousel-container">
      {[prevIndex, currentIndex, nextIndex].map((index, i) => {
        const isCenter = index === currentIndex;
        const isPrev = index === prevIndex;
        const isNext = index === nextIndex;
        const image = images[index];

        return (
          <div
            key={index}
            className={`image-container ${
              isCenter ? "center-image" : isPrev ? "left-image" : "right-image"
            }`}
            onClick={() => handleClick(index)}
            style={{
              backgroundImage: `url(${image.src})`,
            }}
          >
            {isCenter && <div className="text-overlay">{image.text}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default ImageCarousel;
