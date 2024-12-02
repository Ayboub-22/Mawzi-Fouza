// WhyChooseUs.tsx
import "./WhyChooseUs.css";
import QualsContent from "./QualsContent"; // Import the new component

function WhyChooseUs() {
  return (
    <>
      <div className="title">
        <h1>Why Choose Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="content">
        <div className="Quals">
          {/* Call QualsContent component 4 times with different props */}
          <QualsContent
            title="Trainer Qualifications"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Nutrition Experts"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Personalized Programs"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Community Support"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            imageSrc="dumbell.png"
          />
        </div>
        <div className="Pics">
          <div className="photos">
            <div className="verticalPhotos">
              <img src="Rec1.png" alt="Card 2" />
              <img src="Rec2.png" alt="Card 2" />
            </div>
            <img src="Rec3.png" alt="Card 2" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs;
