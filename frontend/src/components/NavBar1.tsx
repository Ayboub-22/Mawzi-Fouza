import "./NavBar1.css";
import Logo from "../assets/images/Vector.png";
import { To, useNavigate } from "react-router-dom";
import { usePopup } from "./PopupContext";
import { useLocation } from "react-router-dom";

function NavBar1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { togglePopup } = usePopup();

  // Fonction pour gérer la navigation et le défilement
  const handleScrollToSection = (path: To, sectionId: string) => {
    if (location.pathname !== path) {
      // Navigue vers la page souhaitée avant de scroller
      navigate(path);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Délai pour s'assurer que la navigation est terminée
    } else {
      // Si déjà sur la page, scrolle directement
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="NavBar">
      <header className="d-flex justify-content-between">
        {/* LOGO */}
        <img src="Logo1.png" alt="Logo" />

        {/* LIST */}
        <ul className="nav d-flex justify-content-center">          {/* nav bar espace user dooone*/ }
          <li className="nav-item">
            <a
              className={`nav-link custom-link ${
                location.pathname === "/espaceuser" ? "active" : ""
              }`}
              onClick={() => navigate("/espaceuser")}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link custom-link"
              onClick={() => handleScrollToSection("/espaceuser", "about")}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link custom-link ${
                location.pathname === "/Offers1" ? "active" : ""
              }`}
              onClick={() => navigate("/Offers1")}
            >
              Offers
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link custom-link ${
                location.pathname === "/Guide1" ? "active" : ""
              }`}
              onClick={() => navigate("/Guide1")}
            >
              Guide
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link custom-link ${
                location.pathname === "/MiniShop1" ? "active" : ""
              }`}
              onClick={() => navigate("/MiniShop1")}
            >
              Mini-Shop
            </a>
          </li>
        </ul>

        {/* LOGOUT BUTTON       hetha dooone */}
         <button className="custom-button" onClick={()=>{navigate('/');}} >
          Logout
        </button> 
      </header>
    </div>
  );
}

export default NavBar1;