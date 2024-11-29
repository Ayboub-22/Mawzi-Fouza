import "./PopupClasses.css";

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
  );
};

export default PopupClasses;
















