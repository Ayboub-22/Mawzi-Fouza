import HomePage1 from "./components/HomePage1";
import "./App.css";
import Figures from "./components/Figures";
import WhyChooseUs from "./components/WhyChooseUs";
import Classes from "./components/Classes";
import Footer from "./components/Footer";
import Planning1 from "./components/Planning1";
import { useLocation } from "react-router-dom";
function App1() {
    const location = useLocation();
    const userCin1 = location.state?.userCin1;
    //console.log(userCin);
    /*alert("d5alt");
    alert(userCin1);*/
  return (
    <div>
      <section className="hero1">
        <HomePage1 userCin1={userCin1} />
      </section>
      <section>
        <Figures />
      </section>
      <section className="hero2" id="about">
        <WhyChooseUs />
      </section>
      <section className="hero3">
        <Classes />
      </section>
      <section className="hero4">
        <Planning1 userCin1={userCin1} />
      </section>
      <section className="hero5">
        <Footer />
      </section>
    </div>
  );
}

export default App1;
