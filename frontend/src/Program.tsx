import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Offer from "./componentsProgram/Program";
import "./Offers.css";
import { PopupProvider } from "./components/PopupContext";
import PopUp from "./components/PopUp";
import "./components/PopUp.css";
import PopUp1 from "./components/PopUp1";
import {
  pushpulllegs,
  workoutProgram1,
  workoutProgram2,
} from "./componentsProgram/WorkoutData";
import Program from "./componentsProgram/Program";

function Offers() {
  return (
    <section className="YPage1">
      <PopupProvider>
        <NavBar />
        <Program title="pushpulllegs" workoutProgram={pushpulllegs} />

        <Footer />
        <PopUp />
        <PopUp1 />
      </PopupProvider>
    </section>
  );
}

export default Offers;
