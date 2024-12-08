// WhyChooseUs.tsx
import "./WhyChooseUs.css";
import QualsContent from "./QualsContent"; // Import the new component

function WhyChooseUs() {
  return (
    <>
      <div className="title">
        <h1>Why Choose Us</h1>
        <p>
        we combine expert guidance, tailored programs, and a supportive community to help you achieve your goals effectively. Trust us to provide the tools, knowledge, and motivation you need to succeed.
        </p>
      </div>
      <div className="content">
        <div className="Quals">
          {/* Call QualsContent component 4 times with different props */}
          <QualsContent
            title="Trainer Qualifications"
            description="Our certified trainers bring years of experience and personalized attention to every workout session."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Nutrition Experts"
            description="We offer tailored meal plans and guidance from licensed nutritionists to keep you on track."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Personalized Programs"
            description="Every program is designed to fit your unique goals, lifestyle, and fitness level."
            imageSrc="dumbell.png"
          />
          <QualsContent
            title="Community Support"
            description="Join a like-minded community that motivates and encourages you every step of the way."
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
