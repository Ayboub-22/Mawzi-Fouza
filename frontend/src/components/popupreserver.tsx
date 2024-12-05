import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import logo from "../components/logo.png";
import { usePopup } from "./PopupContext";
import './PopupReserver.css'; // Assurez-vous de styliser le popup dans ce fichier CSS
import axios from 'axios';
interface Course {
  id: number;
  name: string;
  day:string;
  validity:boolean;
  time: number;
  capacity: number;
}
interface PopupReserverProps {
  onClose: () => void; // Fonction pour fermer le popup
  onReserve: (courseId: number) => void; // Fonction pour gérer la réservation
}

const PopupReserver: React.FC<PopupReserverProps> = ({ onClose, onReserve }) => {
  const [courses, setCourses] = useState<Course[]>([]); // État pour stocker les cours
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Recharger la page actuelle
  };
  const handleReserve = () => {
    if (selectedCourse !== null) {
      onReserve(selectedCourse);
      onClose();           //helaaaaaa***********
    } else {
      alert("Veuillez sélectionner un cours avant de réserver.");
    }
    
  };

  // Effectuer la requête pour récupérer les cours
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cours/planning'); 
        const data = await response.data;
        setCourses(data); // Mettre à jour l'état avec les cours récupérés
        console.log(courses.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }
    };

    fetchCourses(); // Appel de la fonction pour récupérer les cours
  }, []); // Ce useEffect s'exécute une seule fois au montage du composant



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
              {course.name} ({course.day} session {course.time})
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
