import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageCarousel.css";

interface ImageData {
  src: string;
  text: string;
}

const ImageCarousel: React.FC = () => {
  const images: ImageData[] = [
    { src: "image1.png", text: "Text 1" },
    { src: "image2.png", text: "Text 2" },
    { src: "image1.png", text: "Text 3" },
    { src: "image1.png", text: "Text 4" },
    { src: "image1.png", text: "Text 5" },
    { src: "image1.png", text: "Text 6" },
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
