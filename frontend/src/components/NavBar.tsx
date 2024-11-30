import "./NavBar.css";
import Logo from "../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";
import { usePopup } from "./PopupContext";
import { useLocation } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { togglePopup } = usePopup();
  return (
    <div className="NavBar">
      <header className="d-flex justify-content-between">
        {/* LOGO */}
        <img src="Logo1.png" alt="Logo" />

        {/* LIST */}
        <ul className="nav d-flex justify-content-center">
          <li className="nav-item">
          <a
              className={`nav-link custom-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
             <a className="nav-link custom-link" href="#about">    {/*LINDA   */}
              About
            </a>
          </li>
          <li className="nav-item">
          <a
              className={`nav-link custom-link ${
                location.pathname === "/Offers" ? "active" : ""
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </a>
          </li>
          <li className="nav-item">
          <a
              className={`nav-link custom-link ${
                location.pathname === "/Guide" ? "active" : ""
              }`}
              onClick={() => navigate("/Guide")}
            >
              Guide
            </a>
          </li>
          <li className="nav-item">
          <a
              className={`nav-link custom-link ${
                location.pathname === "/MiniShop" ? "active" : ""
              }`}
              onClick={() => navigate("/MiniShop")}
            >
              Mini-Shop
            </a>
          </li>
        </ul>

        {/* JOIN US BUTTON */}
        <button className="custom-button" onClick={togglePopup}>
          Join Now
        </button>
      </header>
    </div>
  );
}
export default NavBar;
