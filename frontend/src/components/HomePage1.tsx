import NavBar1 from "./NavBar1";
import "./HomePage1.css";
import { PopupProvider } from "./PopupContext";
import PopUp from "./PopUp";
import PopUp1 from "./PopUp1";

function HomePage1({ userCin1}:any) {
  return (
    <PopupProvider>
      <div>
        <NavBar1 userCin1={userCin1} />
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

export default HomePage1;
