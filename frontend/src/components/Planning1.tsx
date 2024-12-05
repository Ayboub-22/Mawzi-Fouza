import React, { useState, useEffect } from "react";
import "./Planning1.css";
import { useNavigate , Navigate } from "react-router-dom";
import PopupReserver from "./popupreserver";
import axios from "axios";

function Planning1({ userCin1}:any) {
    const navigate = useNavigate();

  //console.log("dans planning 1");
  //console.log(userCin1);
  const [showPopup, setShowPopup] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);  // État pour la connexion
  const [navigateTo, setNavigateTo] = useState<string | null>(null);   // Gérer la redirection
  //const [userCin, setUserCin] = useState<string | null>(null);  // Cin de l'utilisateur
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    Monday: ["", "", "", "", "", "", "", ""],
    Tuesday: ["", "", "", "", "", "", "", ""],
    Wednesday: ["", "", "", "", "", "", "", ""],
    Thursday: ["", "", "", "", "", "", "", ""],
    Friday: ["", "", "", "", "", "", "", ""],
    Saturday: ["", "", "", "", "", "", "", ""],
    Sunday: ["", "", "", "", "", "", "", ""],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  //Fetch user CIN from localStorage on component mount
//   useEffect(() => {
//     const storedCin = localStorage.getItem("userCin");
//     if (storedCin) {
//       setUserCin(storedCin);
//       setIsLoggedIn(true);
//     }
//   }, []);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cours/getter");
      if (response.status === 200) {
        setSchedule(response.data);
      } else {
        setErrorMessage("Failed to fetch courses.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching courses.");
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const periods = [
    "8H-10H",
    "10H-12H",
    "12H-14H",
    "14H-16H",
    "16H-18H",
    "18H-20H",
    "20H-22H",
    "22H-24H",
  ];

  const handleReservation1 = async (courseId: number) => {
    console.log("hello je suis la je suis sur que c'est un adherant");
    console.log(courseId);
    try{
        const response = await axios.post(`http://localhost:3000/reservation`, { userCin1: userCin1, courseId: courseId, }); 
        if (response.status===200){
            setErrorMessage("booking doone");
        }
      
    }catch(error:any){
        if (error.response) {
            if (error.response.status === 400) {
              console.log("cours passé déjà");
              alert("Le cours est déjà passé, vous ne pouvez pas réserver.");
            }
            else{
                if (error.response.status === 401){
                    console.log("cours complet");
                    alert("Le cours complet.");
                }
                else{
                    console.log('Vous avez déjà réservé ce cours. Merci de l\'attendre.');
                    alert("Vous avez déjà réservé ce cours. Merci de l\'attendre.")
                }
            }
        }
        else{
        console.error("ici ", error);
        setErrorMessage("a reformuler plus tard ");
        }
    }

    //ici il faut verifier a partir de la table reservation si il ya encore une place disponible ou non 
        //donc il faut recupere le id du cours a partir de popupreserver

  }




  // Handle reservation button click
  const handleReservation = async () => {
    console.log("en cliquant sur reserver");
    console.log(userCin1);

    // if (!userCin) {
    //   alert("Vous devez être connecté pour réserver.");
    //   return;
    // }
  
    try {
      // Passez le CIN de l'utilisateur à l'API pour vérifier son statut d'adhérent
      const response = await axios.post('http://localhost:3000/membre/reservation', { cin: userCin1 }); // Assurez-vous de passer le CIN dans la requête
  
      const { adherent } = response.data;
  
      if (adherent) {
        setShowPopup(true); // Affichez le popup pour la réservation
      } else {
        navigate("/Offers1",{ state: { userCin1 } }); // Redirigez vers la page des offres si l'utilisateur n'est pas un adhérent
      }
    } catch (error:any) {
        if (error.response) {
            if (error.response.status === 400) {
              console.log("cin introuvable");
              alert("cin introuvable");
            }
        }
      console.error("Erreur lors de la vérification :", error);
      setErrorMessage("Une erreur s'est produite lors de la vérification du statut d'adhésion.");
    }
  };
  

  // Redirect if necessary 
  //J'AI PAS COMPRIS CA FAIT QUOI §§§§§§§§§§§§§§§§§§§§§§§
//   if (navigateTo) {
//     return <Navigate to={navigateTo} />;
//   }

  return (
    <div className="container">
      <h1>Planning of the Week</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Day</th>
            {periods.map((period) => (
              <th key={period}>{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {schedule[day].map((className, index) => (
                <td key={index} className={className ? "filled" : ""}>
                  {className || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="book" onClick={handleReservation}>
          Booking
        </button>

      {showPopup && (
        <PopupReserver
          onClose={() => setShowPopup(false)}
          onReserve={handleReservation1}
        />
      )}
    </div>
  );
};

export default Planning1;
