import "./AdminProd.css";
import NavAdmin from "../componentsAdmin/NavAdmin";
import { useState } from "react";
import PopupAddProduct from "./PopupAddProduct";
import { useNavigate } from "react-router-dom";
import dele from '../assets/icons/delete.png';
import modify from'../assets/icons/edit.png';
const AdminProd: React.FC = () => {

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  // Données des produits simulées
  const initialProducts = [
    { id: 1, name: "Whey Protein Mexico", designation: "WPM", price: "90,000 DT", category: "protein supplements" },
    { id: 2, name: "Vegan Protein Powder", designation: "VPP", price: "60,000 DT", category: "protein supplements" },
    { id: 3, name: "Organic Protein Powder", designation: "OPP", price: "70,000 DT", category: "protein supplements" },
    { id: 4, name: "T-shirt", designation: "TSH", price: "30,000 DT", category: "gym wear" },
    { id: 5, name: "Gym Tank Top", designation: "GTT", price: "70,000 DT", category: "gym wear" },
    { id: 6, name: "Gloves", designation: "GLV", price: "40,000 DT", category: "equipments and accessories" },
    { id: 7, name: "Gym Belt", designation: "GBL", price: "50,000 DT", category: "equipments and accessories" },
    { id: 8, name: "Gym Bag", designation: "GBG", price: "120,000 DT", category: "equipments and accessories" },
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-container">
      {/* Barre de navigation */}
      <NavAdmin />

      {/* Contenu principal */}
      <div className="admin-content">
        <div className="part1">
          <h1>Products</h1>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
        </div>

        {/* Tableau des produits */}
        <div className="tablepad">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID PRODUCT</th>
                <th>NAME</th>
                <th>DESIGNATION</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="table-row">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.designation}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="div-category">
                    <div className="div-prod">{product.category}</div>
                    <div className="d-span">
                    <span className="d-icon"><img className="d-icon-img" src={modify}></img></span>   {/*le chemin a changer*/}
                    <span className="d-icon"><img className="d-icon-img" src={dele}></img></span>   {/*le chemin a changer*/}
                    </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton pour ajouter un produit */}
        <div className="addprodpad">
          <button className="add-product-button" onClick={handleOpenPopup}>Add product</button>
          <PopupAddProduct show={showPopup} onClose={handleClosePopup} />
        </div>
      </div>
    </div>
  );
};

export default AdminProd;
