import './NavAdmin.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from '../../src/assets/icons/logo.png'
import barchart from '../assets/icons/bar-chart.png'

function NavAdmin(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        
        <div className="sidebar">
            <img src={logo} alt="Logo" className="logo" />

            <h2>Admin Dashboard</h2>
            <nav>
                <a href="#" className={`${
                location.pathname === "/Admin/Admin_Statistics" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/Admin_Statistics")}>ù
                    <span className="icon"><img src={barchart}  ></img></span> 

                    Statistics
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminOffers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminOffers")} >

                    <span className="icon"><img src="../assets/icons/price-tag.png"></img></span> 
                    Offers

                </a>

                <a href="#" className={`${
                location.pathname === "/Admin/AdminMembers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminMembers")}>


                    <span className="icon"><img src="../assets/icons/group-chat.png" ></img></span> 

                    Members
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminSubs" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminSubs")}>


                    <span className="icon"><img src="../assets/icons/subscription.png" ></img></span> 

                    Subscriptions
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminProd" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminProd")}>
                    <span className="icon"><img src="../assets/icons/shop.png" ></img></span> 

                    Products management
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminClasses" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminClasses")}>
                    <span className="icon"><img src="../assets/icons/gym.png" ></img></span>

                    Classes
                    
                </a>
            </nav>
        </div>

    );

}
export default NavAdmin;