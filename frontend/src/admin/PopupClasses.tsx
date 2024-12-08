import "./PopupClasses.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/icons/logo.png";
import axios from "axios";

interface PopupClassesProps {
  show: boolean; // Pour contrôler la visibilité de la popup
}

const PopupClasses: React.FC<PopupClassesProps> = ({ show }) => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState("");
  if (!show) return null; // Ne rien afficher si `show` est false

  // Fonction pour gérer l'ajout de l'offre
  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

    // Création de l'objet de l'offre
    const classData = {name: name,capacity: capacity,day: day,time: time,validity: true,};
    try {
      // Envoi de la requête pour ajouter un cours
      const response = await axios.post(
        "http://localhost:3000/cours/addCours",
        classData
      );

      if (response.status === 201) {
        console.log("Class added successfully:", response.data);
        setCapacity("");
        setDay("");
        setName("");
        setTime("");
      } 
      else {
        if (response.status === 400){
          console.log("il existe deja un cours valide .");
          setErrorMessage("a class already exists");
        }
        else{
          console.log("Failed to add class.");
          setErrorMessage("Failed to add class.");
        }
        
      }
    } catch (error: any) {
      console.error("Add class error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while adding the class."
      );
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleRefresh}>
          X
        </button>
        <div className="Head">
          <img src={logo} alt="Logo" className="logo1" />
        </div>
        <form className="class-form" onSubmit={handleAddClass}>
          {/* Ligne avec Class name et Capacity */}
          <div className="form-row">
            <div className="form-group">
              <label>Class name:</label>
              <input
                type="text"
                placeholder="Enter class name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input
                type="number"
                placeholder="Enter capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Ligne avec Day et Time */}
          <div className="form-row">
            <div className="form-group">
              <label>Day:</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="form-group">
              <label>Session N°:</label>
              <input
                type="number"
                placeholder="Enter a number (0 to 7)"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value ? parseInt(e.target.value) : "")
                }
                required
                min={0}
                max={7}
              />
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
          {/* Affichage des erreurs */}
          {/* Bouton d'ajout */}
          <div className="button-container">
            <button type="submit" className="add-class-button1">
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupClasses;
