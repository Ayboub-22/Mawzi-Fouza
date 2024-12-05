import "./AdminClasses.css"; // Fichier CSS spécifique pour le style
import NavAdmin from "../componentsAdmin/NavAdmin";
import PopupClasses from "./PopupClasses";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importer Axios pour effectuer des requêtes HTTP
import { ScheduleProvider } from "../components/context";

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

  // Fonction pour récupérer les cours depuis le backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cours"); // Requête GET

      // Mettre à jour l'état avec les offres formatées
      setClasses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  // Charger les cours lors du montage du composant
  useEffect(() => {
    fetchClasses(); // Appeler la fonction de récupération des offres au chargement du composant
  }, []);
  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    // Logique de déconnexion ici (par exemple vider un token)
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };
  // Fonction pour gérer le clic sur la checkbox
  const handleCheckboxChange = async (id: number, currentValidity: boolean) => {
    try {
      // Simuler un appel au back-end pour mettre à jour la validité
      const updatedValidity = !currentValidity;
      console.log(updatedValidity);
      console.log(id);

      // Envoyer la requête PUT au back-end
    const response = await axios.put(
      `http://localhost:3000/cours/${id}/validity`,
      { validity: updatedValidity }
    );

      // Mettre à jour l'état localement pour l'instant
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem.id === id
            ? { ...classItem, validity: updatedValidity }
            : classItem
        )
      );

      console.log(response.data.message);

    } catch (error: any) {
      console.error("Erreur lors de la mise à jour :", error);
  
      // Si l'erreur est liée à un conflit (code 400)
      if (error.response && error.response.status === 400) {
        alert(
          error.response.data.message ||
            "Un conflit empêche la mise à jour de ce cours."
        );
      } else {
        alert(
          "Une erreur est survenue lors de la mise à jour. Veuillez réessayer."
        );
      }
  
      // Rétablir l'état précédent en cas d'échec
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem.id === id
            ? { ...classItem, validity: currentValidity }
            : classItem
        )
      );
    }
  };

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Classes</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
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
                      onChange={() =>
                        handleCheckboxChange(classItem.id, classItem.validity)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton pour ajouter une classe */}
        <div className="addclasspad">
          <button className="add-class-button" onClick={handleOpenPopup}>
            Add Class
          </button>
          {/* Affichage de la popup */}
          <ScheduleProvider>
            <PopupClasses show={showPopup} />
          </ScheduleProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminClasses;
