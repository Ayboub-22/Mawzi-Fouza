import "./PopUp.css";
import { usePopup } from "./PopupContext";

import { useNavigate } from "react-router-dom";

function getClassName(isActive: boolean): string {
  return isActive ? "boutton1 active" : " boutton1 inactive";
}
function getClassName1(isActive: boolean): string {
  return isActive ? "boutton2 inactive" : "boutton2 active";
}

function PopUp() {

  const navigate = useNavigate(); // Hook pour naviguer vers une autre route

  const handleSignUp = () => {
    navigate("/Admin/Admin_Statistics"); // Redirige vers /Admin                           //a developper plus tard DB}
  };

  const {
    isMember,
    changeStatus1,
    changeStatus2,
    isPopup1Visible,
    togglePopup1,
    isPopupVisible,
    closePopup,
    closePopup1,
  } = usePopup();

  if (!isPopupVisible) return null;

  return (
    <div className="PopUp">
      <div className="Form">
        <button
          className="close-button"
          onClick={closePopup}
          aria-label="Close popup"
        >
          ✕
        </button>
        <div className="Head">
          <img src="./Logo.png" alt="logo" />
          <div className="bouttons">
            <a
              className={getClassName(isMember)}
              onClick={() => {
                changeStatus1();
              }}
            >
              Member
            </a>
            <a
              className={getClassName1(isMember)}
              onClick={() => {
                changeStatus2();
              }}
            >
              Staff
            </a>
          </div>
        </div>
        <div className="Form1">
          <h1>Sign in</h1>
          <p>un essage quelcoque sui affiche</p>
          <form className="sign-in-form">
            <input type="email" id="email" placeholder="mail" required />

            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />

            <div className="keep-logged-in">
              <input type="checkbox" id="keep-logged-in" />
              <label htmlFor="keep-logged-in">Keep me logged in</label>
            </div>

            {isMember && (
              <div className="create-account">
                Need an account?{" "}
                <a
                  onClick={() => {
                    closePopup();
                    togglePopup1();
                  }}
                >
                  Create one
                </a>
              </div>
            )}

            <button type="submit" className="submit-button" onClick={handleSignUp}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PopUp;
