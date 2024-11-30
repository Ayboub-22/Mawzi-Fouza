import "./PopupModifyProduct.css";
import logo from '../../src/assets/icons/logo.png';

interface PopupModifyProductProps {

  show: boolean; // Pour contrôler la visibilité de la popup
  onClose: () => void; // Fonction pour fermer la popup
}


const PopupModifyProduct: React.FC<PopupModifyProductProps> = ({ show, onClose }) => {

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
        <form className="product-form">
          {/* Ligne avec Product Name et Category */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Name:</label>
              <input type="text" placeholder="Enter product name" />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input type="text" placeholder="Enter category" />
            </div>
          </div>

          {/* Ligne avec Price et Quantity */}
          <div className="form-row">
            <div className="form-group">
              <label>Price:</label>
              <input type="number" placeholder="Enter price" />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input type="number" placeholder="Enter quantity" />
            </div>
          </div>

          {/* Ligne avec Description */}
          <div className="form-row">
            <div className="form-group">
              <label>Description:</label>
              <textarea placeholder="Enter product description" rows={4}></textarea>
            </div>
          </div>

          {/* Ligne avec Image */}
          <div className="form-row">
            <div className="form-group">
              <label>Image:</label>
              <input type="file" accept="image/*" />
            </div>
          </div>

          {/* Bouton d'ajout */}
          <div className="button-container">
            <button type="submit" className="add-product-button1">Modify Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupModifyProduct;
