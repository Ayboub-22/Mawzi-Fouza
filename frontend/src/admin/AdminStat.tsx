import React, { useState, useEffect } from "react";
import NavAdmin from "../componentsAdmin/NavAdmin";
import "./AdminStat.css";
import Chart from "./Chart";
import { useNavigate } from "react-router-dom";
import membre from "../assets/icons/membre-noir.png";

function AdminStat() {
  const navigate = useNavigate();

  // État pour stocker le nombre d'abonnements actifs
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);

  // Fonction pour récupérer les données du backend
  useEffect(() => {
    const fetchActiveSubscriptions = async () => {
      try {
        const response = await fetch("http://localhost:3000/membre/calcul"); // Remplacez par l'URL correcte de votre backend
        const data = await response.json();

        // Mettre à jour le nombre d'abonnements actifs
        setActiveSubscriptions(data.activeSubscriptionsCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchActiveSubscriptions();
  }, []); // Appeler cette fonction uniquement au montage du composant

  return (
    <div className="admin-stat-container">
      <NavAdmin />
      <div id="rightside">
        <div id="rightsidetop">
          {/* Section pour afficher le nombre de membres actifs */}
          <div id="nbr-membre">
            <img src={membre} id="img-membre" alt="Icone membre" />
            <label>{activeSubscriptions}</label> {/* Afficher la valeur dynamique */}
          </div>
          {/* Bouton pour se déconnecter */}
          <button className="logout-button" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
        <Chart />
      </div>
    </div>
  );
}

export default AdminStat;
