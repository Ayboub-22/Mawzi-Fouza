import "./AdminClasses.css"; // Fichier CSS spécifique pour le style
import NavAdmin from "../componentsAdmin/NavAdmin";
import PopupClasses from "./PopupClasses";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importer Axios pour effectuer des requêtes HTTP

interface Course {
  id: number;
  name: string;
  day: string;
  time: string;
  capacity: number;
  validity: boolean;
}

const AdminClasses: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Course[]>([]); // État pour stocker les cours
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  // Fonction pour récupérer les cours depuis le backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cours/"); // Requête GET
      setClasses(response.data); // Mettre à jour l'état avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  // Charger les cours lors du montage du composant
  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Classes</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
        </div>

        {/* Tableau des classes */}
        <div className="tablepad">
          <table className="classes-table">
            <thead>
              <tr>
                <th>ID_CLASSES</th>
                <th>NAME</th>
                <th>DAY</th>
                <th>TIME</th>
                <th>CAPACITY</th>
                <th>VALIDITY</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr key={classItem.id} className="table-row">
                  <td>{classItem.id}</td>
                  <td>{classItem.name}</td>
                  <td>{classItem.day}</td>
                  <td>{classItem.time}</td>
                  <td>{classItem.capacity}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={classItem.validity}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton pour ajouter une classe */}
        <div className="addclasspad">
          <button className="add-class-button" onClick={handleOpenPopup}>Add Class</button>
          {/* Affichage de la popup */}
        <PopupClasses show={showPopup} onClose={handleClosePopup} />
        </div>
      </div>
    </div>
  );
};

export default AdminClasses;


