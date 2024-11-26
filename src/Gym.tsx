import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Guide from "./Guide";
import Offers from "./Offers";
import MiniShop from "./MiniShop";
import Admin_Statistics from "./Admin_Statistics";
import AdminOffers from"./admin/AdminOffers";
import AdminMembers from "./admin/AdminMembers";
import AdminSubs from "./admin/AdminSubs";
import AdminProd from "./admin/AdminProd";
import AdminClasses from "./admin/AdminClasses";

const Gym: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/MiniShop" element={<MiniShop />} />
        {/* Routes protégées pour l'espace admin */}
        <Route path="/Admin/Admin_Statistics" element={<Admin_Statistics />} />
        <Route path="/Admin/AdminOffers" element={<AdminOffers />} />
        <Route path="/Admin/AdminMembers" element={<AdminMembers />} />
        <Route path="/Admin/AdminSubs" element={<AdminSubs />} />
        <Route path="/Admin/AdminProd" element={<AdminProd />} />
        <Route path="/Admin/AdminClasses" element={<AdminClasses />} />
        
      </Routes>
    </Router>
  );
};

export default Gym;
