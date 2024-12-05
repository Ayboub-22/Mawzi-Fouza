import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import App1 from "./App1";
import Guide from "./Guide";
import Offers from "./Offers";
import MiniShop from "./MiniShop";
import AdminStat from "./admin/AdminStat"
import AdminOffers from"./admin/AdminOffers";
import AdminMembers from "./admin/AdminMembers";
import AdminSubs from "./admin/AdminSubs";
import AdminProd from "./admin/AdminProd";
import AdminClasses from "./admin/AdminClasses";
import Offers1 from "./Offers1";
import MiniShop1 from "./MiniShop1";
import Guide1 from "./Guide1";

const Gym: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/espaceuser" element={<App1 />} />
        <Route path="/Guide1" element={<Guide1 />} />
        <Route path="/Offers1" element={<Offers1 />} />
        <Route path="/MiniShop1" element={<MiniShop1 />} />
        <Route path="/Guide" element={<Guide />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/MiniShop" element={<MiniShop />} />
        {/* Routes protégées pour l'espace admin */}
        <Route path="/admin/AdminStat" element={<AdminStat />} />
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
