import "./AdminClasses.css"; // Fichier CSS spécifique pour le style
import NavAdmin from "../componentsAdmin/NavAdmin";
import PopupClasses from "./PopupClasses";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminClasses: React.FC = () => {
  const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  // Données des classes simulées
  const classes = [
    { id: 1, name: "Danse Orientale", day: "Monday", time: "19h", capacity: 30, validity: false },
    { id: 2, name: "Body Pump", day: "Tuesday", time: "21h", capacity: 25, validity: true },
    { id: 3, name: "Cross Training", day: "Monday", time: "19h", capacity: 30, validity: false },
    { id: 4, name: "Body Combat", day: "Friday", time: "20h30", capacity: 25, validity: true },
    { id: 5, name: "Six Pack", day: "Wednesday", time: "19h30", capacity: 20, validity: false },
    { id: 6, name: "Body Pump", day: "Friday", time: "17h", capacity: 25, validity: true },
    { id: 7, name: "Six Pack", day: "Monday", time: "19h", capacity: 20, validity: true },
    { id: 8, name: "Danse Orientale", day: "Thursday", time: "18h30", capacity: 30, validity: false },
    { id: 9, name: "Body Combat", day: "Saturday", time: "18h", capacity: 25, validity: true },
  ];

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


