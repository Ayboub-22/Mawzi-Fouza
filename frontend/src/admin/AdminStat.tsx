import NavAdmin from"../componentsAdmin/NavAdmin";
import "./AdminStat.css";
import Chart from "./Chart";
import {useNavigate } from "react-router-dom";
import membre from "../assets/icons/membre-noir.png"

function AdminStat() {
  const navigate = useNavigate();
    return (
      <div className="admin-stat-container">
      <NavAdmin />
      <div id='rightside'>
      <div id='rightsidetop'>
      {/* Bouton pour se déconnecter */}
      <div id='nbr-membre'>
          <img src={membre} id='img-membre'></img>
          <label>500</label>
      </div>
      <button className="logout-button" onClick={() => navigate("/")}>Logout</button>
      </div>
      <Chart/>
      </div>
  </div>   
      
    );
  }
  
export default AdminStat;

