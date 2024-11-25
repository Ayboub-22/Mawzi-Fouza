import './NavAdmin.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function NavAdmin(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        
        <div className="sidebar">
            <img src="..\components\logo.png" alt="Logo" className="logo" />
            <h2>Admin Dashboardd</h2>
            <nav>
                <a href="#" className={`${
                location.pathname === "/Admin/Admin_Statistics" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/Admin_Statistics")}>

                    <span className="icon"><img src="../assets/icons/bar-chart.png"  alt="icon"></img></span> 
                    Statistics
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminOffers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminOffers")} >

                    <span className="icon"><img src="../assets/icons/price-tag.png"alt="icon"></img></span> 
                    Offers

                </a>

                <a href="#" className={`${
                location.pathname === "/Admin/AdminMembers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminMembers")}>

                    <span className="icon"><img src="../assets/icons/group-chat.png" alt="icon"></img></span> 
                    Members
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminSubs" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminSubs")}>

                    <span className="icon"><img src="../assets/icons/subscription.png" alt="icon"></img></span> 
                    Subscriptions
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminProd" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminProd")}>
                    <span className="icon"><img src="../assets/icons/shop.png" alt="icon"></img></span> 
                    Products management
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminClasses" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminClasses")}>

                    <span className="icon"><img src="../assets/icons/gym.png" alt="icon"></img></span>
                    Classes
                    
                </a>
            </nav>
        </div>

    );

}
export default NavAdmin;