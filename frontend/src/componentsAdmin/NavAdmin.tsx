import './NavAdmin.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from '../../src/assets/icons/logo.png';
import barchart from '../assets/icons/bar-chart.png';
import priccetag from '../assets/icons/price-tag.png';
import groupchat from '../assets/icons/group-chat.png';
import subscription from '../assets/icons/subscription.png';
import shop from'../assets/icons/shop.png';
import gym from '../assets/icons/gym.png';
function NavAdmin(){
    const navigate = useNavigate();
    const location = useLocation();

    return(
        
        <div className="sidebar">
            <img src={logo} alt="Logo" className="logo" />

            <h2>Admin Dashboard</h2>
            <nav>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminStat" ? "active" : ""
              }`}

              onClick={() => navigate("/Admin/AdminStat")}>
                    <span className="icon"><img src={barchart} className='icon-img' ></img></span> 

                    Statistics
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminOffers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminOffers")} >

                    <span className="icon"><img src={priccetag} className='icon-img'></img></span> 
                    Offers

                </a>

                <a href="#" className={`${
                location.pathname === "/Admin/AdminMembers" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminMembers")}>
                    <span className="icon-grp"><img src={groupchat} className='icon-img-grp'></img></span> 
                    Members
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminSubs" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminSubs")}>


                    <span className="icon"><img src={subscription} className='icon-img' ></img></span> 

                    Subscriptions
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminProd" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminProd")}>
                    <span className="icon"><img src={shop} className='icon-img-shop' ></img></span> 

                    Products management
                    
                </a>
                <a href="#" className={`${
                location.pathname === "/Admin/AdminClasses" ? "active" : ""
              }`}
              onClick={() => navigate("/Admin/AdminClasses")}>
                    <span className="icon"><img src={gym} className='icon-img-shop' ></img></span>

                    Classes
                    
                </a>
            </nav>
        </div>

    );

}
export default NavAdmin;