import React, { useState, useEffect } from "react";
import "./Planning.css";
import { Navigate } from "react-router-dom";
import PopupReserver from "./popupreserver";
import axios from "axios";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navigateTo, setNavigateTo] = useState<string | null>(null);
  const [userCin, setUserCin] = useState<string | null>(null);
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

  // Fetch user CIN from localStorage on component mount
  useEffect(() => {
    const storedCin = localStorage.getItem("userCin");
    if (storedCin) {
      setUserCin(storedCin);
      setIsLoggedIn(true);
    }
  }, []);

 // Function to fetch courses from the backend
 const fetchCourses = async () => {
  try {
    // Send GET request to fetch courses
    const response = await axios.get("http://localhost:3000/cours/getter");

    if (response.status === 200) {
      // Assuming the response data is in a format where each day has a list of courses
      const cours = response.data; // Adjust this based on the actual structure of your response
      setSchedule(cours);
      console.log("hedha howa");
    } else {
      setErrorMessage("Failed to fetch courses.");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while fetching courses."
      );
    } else {
      setErrorMessage("An unknown error occurred.");
    }
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

  // Handle reservation button click
  const handleReservation = async () => {
    if (!userCin) {
      alert("Vous devez être connecté pour réserver.");
      return;
    }
  
    try {
      // Passez le CIN de l'utilisateur à l'API pour vérifier son statut d'adhérent
      const response = await axios.get(`http://localhost:3000/membre/reservation`, {
        params: { cin: userCin }, // Assurez-vous de passer le CIN dans la requête
      });
  
      const { adherent } = response.data;
  
      if (adherent) {
        setShowPopup(true); // Affichez le popup pour la réservation
      } else {
        setNavigateTo("/Offers"); // Redirigez vers la page des offres si l'utilisateur n'est pas un adhérent
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      setErrorMessage("Une erreur s'est produite lors de la vérification du statut d'adhésion.");
    }
  };
  

  // Redirect if necessary
  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

   // Redirection vers une autre page si nécessaire
   if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }

  return (
    <div className="container">
      <h1>Planning of the Week</h1>

      {/* Error Message */}
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
                  {className || ""} {/* If no class, show a placeholder */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bouton de réservation affiché uniquement si connecté */}
      {isLoggedIn && (
        <button type="button" className="book" onClick={handleReservation}>
          Réserver
        </button>
      )}

      {/* Popup de réservation */}
      {showPopup && (
        <PopupReserver
          onClose={() => setShowPopup(false)}
          courses={[]} // Remplacer par les données réelles
          onReserve={() => {
            setShowPopup(false); // Fermer la popup après réservation
          }}
        />
      )}

      {/* Bouton de connexion/déconnexion
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Se connecter</button>
      ) : (
        <button onClick={handleLogout}>Se déconnecter</button>
      )} */}
    </div>
  );

};

export default App;
