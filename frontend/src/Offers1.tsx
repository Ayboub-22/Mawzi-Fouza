import NavBar1 from "./components/NavBar1";
import Footer from "./components/Footer";
import Offer1 from "./componentsOffers/Offer1";
import "./Offers.css";
import { PopupProvider } from "./components/PopupContext";
import PopUp from "./components/PopUp";
import "./components/PopUp.css";
import PopUp1 from "./components/PopUp1";

function Offers() {
  return (
    <section className="YPage1">
      <PopupProvider>
        <NavBar1 />
        <Offer1 />
        <Footer />
        <PopUp />
        <PopUp1 />
      </PopupProvider>
    </section>
  );
}

export default Offers;
