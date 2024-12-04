<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
>>>>>>> 64ce62dbfc79fc967d1e59bd596d41479f53954b
import "./Planning.css";
import { Navigate } from "react-router-dom";
import PopupReserver from "./popupreserver";
import axios from "axios"; // Pour les requêtes API

const App = () => {
<<<<<<< HEAD
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour la connexion
  const [navigateTo, setNavigateTo] = useState<string | null>(null); // Gérer la redirection
  const [userCin, setUserCin] = useState<string | null>(null); // Cin de l'utilisateur

  const schedule = {
    Monday: ["8H-10H", "10H-12H", "14H-16H"],
    Tuesday: ["12H-14H", "16H-18H"],
    Wednesday: ["8H-10H", "18H-20H"],
    Thursday: ["10H-12H", "20H-22H"],
    Friday: ["14H-16H", "22H-24H"],
    Saturday: ["16H-18H", "18H-20H"],
    Sunday: ["10H-12H"],
=======
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
>>>>>>> 64ce62dbfc79fc967d1e59bd596d41479f53954b
  };

  // Use useEffect to fetch the courses when the component mounts
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

  // Fonction de connexion avec gestion du cin
  const handleLogin = async () => {
    try {
      const response = await axios.post("/user/login", {
        email: "lindachrigui03@gmail.com", // Exemple : remplacer par des données du formulaire
        password: "lindawski",
      });

      const { cin } = response.data;
      localStorage.setItem("cin", cin);
      setUserCin(cin);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserCin(null);
    localStorage.removeItem("cin");
  };

  // Gestion du clic sur le bouton "Réserver"
  const handleReservation = async () => {
    const cin = localStorage.getItem("cin");
    if (!cin) {
      alert("Vous devez être connecté pour réserver.");
      return;
    }

    try {
      const response = await axios.get(`/api/isAdherent/${cin}`);
      const { adherent } = response.data;

      if (adherent) {
        setShowPopup(true);
      } else {
        setNavigateTo("/offres"); // Rediriger si non adhérent
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
    }
  };

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
<<<<<<< HEAD
              {periods.map((period) => (
                <td
                  key={period}
                  className={
                    schedule[day as keyof typeof schedule].includes(period)
                      ? "classe"
                      : ""
                  }
                ></td>
=======
              {schedule[day].map((className, index) => (
                <td key={index} className={className ? "filled" : ""}>
                  {className || ""} {/* If no class, show a placeholder */}
                </td>
>>>>>>> 64ce62dbfc79fc967d1e59bd596d41479f53954b
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
