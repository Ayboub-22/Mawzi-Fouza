import React from "react";
import "./Planning.css";
import { Navigate  } from "react-router-dom";
import { useState } from "react";
import PopupReserver from "./popupreserver";


const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ajouter un état de connexion
  const schedule = {
    Monday: ["8H-10H", "10H-12H", "14H-16H"],
    Tuesday: ["12H-14H", "16H-18H"],
    Wednesday: ["8H-10H", "18H-20H"],
    Thursday: ["10H-12H", "20H-22H"],
    Friday: ["14H-16H", "22H-24H"],
    Saturday: ["16H-18H", "18H-20H"],
    Sunday: ["10H-12H"],
  };

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
    // Gérer la connexion/déconnexion
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

  return (

    <div className="container">
      <h1>Planning of the Week</h1>
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
              {periods.map((period) => (
                <td
                key={period}
                className={schedule[day as keyof typeof schedule].includes(period) ? "classe" : ""}
              ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
       {/* Afficher le bouton uniquement si l'utilisateur est connecté */}
       {isLoggedIn && (
        <button type="button" className="book" onClick={() => setShowPopup(true)}>
          Booking
        </button>
      )}
      
      {showPopup && (
        <PopupReserver
          onClose={() => setShowPopup(false)} courses={[]} onReserve={function (courseId: number): void {
            throw new Error("Function not implemented.");
          } }        />
      )}

    </div>
  );
};

export default App;
