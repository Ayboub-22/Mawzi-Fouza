import NavBar1 from "./components/NavBar1";
import Footer from "./components/Footer";
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
import { useLocation } from "react-router-dom";

function Programs() {
  const location = useLocation();
  const userCin1 = location.state?.userCin1;
  const index = location.state?.id;
  

  // Tableau des programmes avec leur titre et leur contenu
  const programs = [
    { title: "Full Body Strength", workoutProgram: fullBodyStrength },
    { title: "Push Pull Legs", workoutProgram: pushpulllegs },
    { title: "Body Weight", workoutProgram: bodyweight },
    { title: "HIIT", workoutProgram: HIIT },
    { title: "Strength & Conditioning", workoutProgram: strengthAndConditionning },
    { title: "Abs Workout", workoutProgram: absWorkoutForBeginners },
  ];

  // Vérifiez si l'indice est valide
  const selectedProgram =
    index >= 0 && index < programs.length ? programs[index] : null;
  console.log(index);
  return (
    <section className="YPage1">
      <PopupProvider>
        <NavBar1 userCin1={userCin1} />

        {/* Affichez uniquement le programme correspondant */}
        {selectedProgram ? (
          <Program
            title={selectedProgram.title}
            workoutProgram={selectedProgram.workoutProgram}
          />
        ) : (
          <p>Programme non trouvé ou indice invalide.</p>
        )}

        <Footer />
        <PopUp />
        <PopUp1 />
      </PopupProvider>
    </section>
  );
}

export default Programs;
