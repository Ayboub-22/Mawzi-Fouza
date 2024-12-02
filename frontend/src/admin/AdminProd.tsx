import React, { useState, useEffect } from "react";
import "./AdminProd.css";
import { useNavigate } from "react-router-dom";
import modify from '../assets/icons/edit.png';
import dele from '../assets/icons/delete.png';
import PopupAddProduct from "./PopupAddProduct";
import PopupModifyProduct from "./PopupModifyProduct";
import PopupConfirmDelete from "./PopupConfirmDelete";
import NavAdmin from "../componentsAdmin/NavAdmin";
import axios from "axios"; 

// Type pour les produits
interface Product {
  id: number;
  name: string;
  designation: string;
  prix: string;
  categorie: string;
}

const AdminProd: React.FC = () => {
  const navigate = useNavigate();

  // États pour gérer les produits et pop-ups
  const [products, setProducts] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState<number | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/article/");
        const transformedProducts = response.data.map((article: any) => ({
          id: article.id,
          name: article.name,
          designation: article.designation,
          prix: article.prix,
          categorie: article.categorie,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  // Gestion des pop-ups
  const handleOpenPopup = () => setShowPopup(true);

  const handleModifyPopup = (product: Product) => {
    setSelectedProduct(product);
    setShowModifyPopup(product.id);
  };

  const handleCloseModifyPopup = () => {
    setSelectedProduct(null);
    setShowModifyPopup(null);
  };

  const handleDelete = async () => {
    if (productToDelete !== null) {
      try {
        await axios.delete(`http://localhost:3000/article/${productToDelete}`);
        setProducts(products.filter((product) => product.id !== productToDelete));
        setProductToDelete(null);
        setShowDeletePopup(false);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const openDeletePopup = (id: number) => {
    setProductToDelete(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setProductToDelete(null);
  };

  return (
    <div className="admin-container">
      <NavAdmin />
      <div className="admin-content">
        <div className="part1">
          <h1>Products</h1>
          <button className="logout-button" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>

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
                  <td>{product.prix}</td>
                  <td>
                    <div className="div-category">
                      <div className="div-prod">{product.categorie}</div>
                      <div className="d-span">
                        <span className="d-icon">
                          <img
                            className="d-icon-img"
                            src={modify}
                            onClick={() => handleModifyPopup(product)}
                          />
                        </span>
                        <span className="d-icon">
                          <img
                            className="d-icon-img"
                            src={dele}
                            onClick={() => openDeletePopup(product.id)}
                          />
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="addprodpad">
          <button className="add-product-button" onClick={handleOpenPopup}>
            Add product
          </button>
        </div>

        {/* Pop-up pour ajouter un produit */}
        {showPopup && <PopupAddProduct show={showPopup}  />}

        {/* Pop-up pour modifier un produit */}
        {showModifyPopup !== null && selectedProduct && (
          <PopupModifyProduct
            show={true}
            onClose={handleCloseModifyPopup}
            product={selectedProduct}
          />
        )}

        {/* Pop-up de confirmation de suppression */}
        {showDeletePopup && (
          <PopupConfirmDelete
            onConfirm={handleDelete}
            onCancel={closeDeletePopup}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProd;
