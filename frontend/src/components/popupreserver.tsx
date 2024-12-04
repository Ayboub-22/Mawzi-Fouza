import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import logo from "../components/logo.png";
import { usePopup } from "./PopupContext";
import './PopupReserver.css'; // Assurez-vous de styliser le popup dans ce fichier CSS

interface PopupReserverProps {
  courses: { id: number; name: string; availableSlots: number }[]; // Liste des cours disponibles
  onClose: () => void; // Fonction pour fermer le popup
  onReserve: (courseId: number) => void; // Fonction pour gérer la réservation
}

const PopupReserver: React.FC<PopupReserverProps> = ({ courses, onClose, onReserve }) => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };
  const handleReserve = () => {
    if (selectedCourse !== null) {
      onReserve(selectedCourse);
    } else {
      alert("Veuillez sélectionner un cours avant de réserver.");
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
        <h2>Book a course</h2>
        <select
          value={selectedCourse || ''}
          onChange={(e) => setSelectedCourse(Number(e.target.value))}>
          <option value="" disabled>
            select a course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.availableSlots} places disponibles)
            </option>
          ))}
        </select>
        <div className="popup-actions">
          <button onClick={handleReserve} className="reserve-button">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupReserver;
