import "./PopupClasses.css";
<<<<<<< HEAD
=======
import logo from '../../src/assets/icons/logo.png';
>>>>>>> dfab8c16c8ec2d0eb4a570113039212a1ef52dd8

interface PopupClassesProps {
  show: boolean; // Pour contrôler la visibilité de la popup
  onClose: () => void; // Fonction pour fermer la popup
}

const PopupClasses: React.FC<PopupClassesProps> = ({ show, onClose }) => {
  if (!show) return null; // Ne rien afficher si `show` est false

  return (
    <div className="popup-overlay">
<<<<<<< HEAD
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="Head">
          <img src="./Logo.png" alt="logo" />
        </div>
        <div className="div_offerform"><form className="offerform">
          <div className="label"><label>Duration:</label></div>
          <input type="text" placeholder="Enter duration" />
          <div className="label"><label>Price:</label></div>
          <input type="text" placeholder="Enter price" />
          
        </form></div>
        <div className="div_addoffer"><button type="submit" className="addoffer" >Add Offer</button></div>
        
      </div>
    </div>
=======
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

>>>>>>> dfab8c16c8ec2d0eb4a570113039212a1ef52dd8
  );
};

export default PopupClasses;
<<<<<<< HEAD
















=======
>>>>>>> dfab8c16c8ec2d0eb4a570113039212a1ef52dd8
