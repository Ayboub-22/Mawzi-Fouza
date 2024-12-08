import NavBar from "./NavBar";
import "./HomePage.css";
import { PopupProvider } from "./PopupContext";
import PopUp from "./PopUp";
import PopUp1 from "./PopUp1";

function HomePage() {
  return (
    <PopupProvider>
      <div>
        <NavBar />
      </div>
      <div className="HomeTitle">
        <h2>make your</h2>
        <h1>BODY SHAPE</h1>
        <p>
          Being physically active can improve your brain health, help manage
          weight, reduce the risk of disease, strengthen bones and muscles, and
          improve your ability to do everyday activities. 
        </p>
      </div>

      <PopUp />
      <PopUp1 />
    </PopupProvider>
  );
}

export default HomePage;
