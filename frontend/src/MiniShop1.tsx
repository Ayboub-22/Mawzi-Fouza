import HomePage from "./components/HomePage";
import "./MiniShop.css";
import Figures from "./components/Figures";
import WhyChooseUs from "./components/WhyChooseUs";
import Classes from "./components/Classes";
import Shop1 from "./componentsShop/Shop1";
import { useLocation } from "react-router-dom";
function MiniShop() {
    const location = useLocation();
    const userCin1 = location.state?.userCin1;
  return (
    <div>
      <section>
        <Shop1 userCin1={userCin1} />
      </section>
    </div>
  );
}

export default MiniShop;
