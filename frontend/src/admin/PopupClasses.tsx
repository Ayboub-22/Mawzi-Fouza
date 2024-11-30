import "./PopupClasses.css";

import logo from '../../src/assets/icons/logo.png';

interface PopupClassesProps {
  show: boolean; // Pour contrôler la visibilité de la popup
  onClose: () => void; // Fonction pour fermer la popup
}

const PopupClasses: React.FC<PopupClassesProps> = ({ show, onClose }) => {
  if (!show) return null; // Ne rien afficher si `show` est false

  return (
    <div className="popup-overlay">

    <div className="popup-content">
    <button className="close-button" onClick={onClose}>
      X
    </button>
    <div className="Head">
    <img src={logo} alt="Logo" className="logo1" />
    </div>
    <form className="class-form">
      {/* Ligne avec Class name et Capacity */}
      <div className="form-row">
        <div className="form-group">
          <label>Class name:</label>
          <input type="text" placeholder="Enter class name" />
        </div>
        <div className="form-group">
          <label>Capacity:</label>
          <input type="number" placeholder="Enter capacity" />
        </div>
      </div>

      {/* Ligne avec Day et Time */}
      <div className="form-row">
        <div className="form-group">
          <label>Day:</label>
          <select>
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
          <label>Time:</label>
          <input type="time" />
        </div>
      </div>
      
      {/* Bouton d'ajout */}
      <div className="button-container">
        <button type="submit" className="add-class-button1">Add Class</button>
      </div>
    </form>
  </div>
</div>


  );
};

export default PopupClasses;
