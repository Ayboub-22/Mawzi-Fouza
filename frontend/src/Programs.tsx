import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Offer from "./componentsProgram/Program";
import "./Offers.css";
import { PopupProvider } from "./components/PopupContext";
import PopUp from "./components/PopUp";
import "./components/PopUp.css";
import PopUp1 from "./components/PopUp1";
import {
  absWorkoutForBeginners,
  bodyweight,
  fullBodyStrength,
  HIIT,
  pushpulllegs,
  strengthAndConditionning,
} from "./componentsProgram/WorkoutData";
import Program from "./componentsProgram/Program";

function Programs() {
  return (
    <section className="YPage1">
      <PopupProvider>
        <NavBar />
        <Program title="Push Pull Legs" workoutProgram={pushpulllegs} />
        {/* <Program title="Strength & Conditionning" workoutProgram={strengthAndConditionning} />
        <Program title="HIIT" workoutProgram={HIIT} />
        <Program title="Body Weight" workoutProgram={bodyweight} />
        <Program title="Full Body Strength" workoutProgram={fullBodyStrength} />
        <Program title="Abs Workout" workoutProgram={absWorkoutForBeginners} /> */}

        <Footer />
        <PopUp />
        <PopUp1 />
      </PopupProvider>
    </section>
  );
}

export default Programs;
