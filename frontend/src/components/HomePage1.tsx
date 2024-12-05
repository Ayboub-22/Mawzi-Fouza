import NavBar1 from "./NavBar1";

import { PopupProvider } from "./PopupContext";
import PopUp from "./PopUp";
import PopUp1 from "./PopUp1";

function HomePage1() {
  return (
    <PopupProvider>
      <div>
        <NavBar1 />
      </div>
      <div>
        <h1>Welcome to our website!</h1>
      </div>

      <PopUp />
      <PopUp1 />
    </PopupProvider>
  );
}

export default HomePage1;
