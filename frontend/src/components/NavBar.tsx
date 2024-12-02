import "./NavBar.css";
import Logo from "../assets/images/Vector.png";
import { To, useNavigate } from "react-router-dom";
import { usePopup } from "./PopupContext";
import { useLocation } from "react-router-dom";

function NavBar() {
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
            <a
              className="nav-link custom-link"
              onClick={() => handleScrollToSection("/", "about")}
            >
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