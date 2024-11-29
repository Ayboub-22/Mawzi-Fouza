import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Offer from "./componentsOffers/Offer";
import "./Offers.css";
import { PopupProvider } from "./components/PopupContext";
import PopUp from "./components/PopUp";
import "./components/PopUp.css";
import PopUp1 from "./components/PopUp1";

function Offers() {
  return (
    <section className="YPage1">
      <PopupProvider>
        <NavBar />
        <Offer />
        <Footer />
        <PopUp />
        <PopUp1 />
      </PopupProvider>
    </section>
  );
}

export default Offers;
