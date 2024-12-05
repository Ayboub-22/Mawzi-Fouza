import "./PopUp.css";
import { usePopup } from "./PopupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/icons/logo.png";

function getClassName(isActive: boolean): string {
  return isActive ? "boutton1 active1" : "boutton1 inactive";
}
function getClassName1(isActive: boolean): string {
  return isActive ? "boutton2 inactive" : "boutton2 active1";
}

function PopUp() {
  const navigate = useNavigate(); // Hook for navigation
  const [identifier, setIdentifier] = useState(""); // Will be either name or mail depending on the user type
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userCin, setUserCin] = useState<string | null>(null); // State for storing user ID

  // Retrieve stored user ID from localStorage on component mount
  // useEffect(() => {
  //   const storedUserCin = localStorage.getItem("userCin");
  //   if (storedUserCin) {
  //     setUserCin(storedUserCin);
  //   }
  // }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const loginData = isMember
        ? { mail: identifier, password } // For user login
        : { name: identifier, password }; // For admin login

      const loginUrl = isMember
        ? "http://localhost:3000/user/login"
        : "http://localhost:3000/admin/login";

      const response = await axios.post(loginUrl, loginData);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Retrieve user ID from the response

        /******************* */
        /*if(isMember){
        const userCintemp = response.data.user.cin;
        alert(userCintemp);
        setUserCin(userCintemp); // Store the user ID in state
        //localStorage.setItem("userCin", userCin); // Store the user ID in localStorage
        alert("user Cin:aaaa")
        alert(userCin);
        }*/
        // Redirect based on user type
        if (isMember) {
          //const userCin1=userCin;
          closePopup();
          //alert(userCin1);
          /*alert(userCin);*/
          /*alert("avant de naviger");
          alert(response.data.user.cin);*/
          navigate("/espaceuser", { state: { userCin1:response.data.user.cin } }); // User home page               !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        } else {
          navigate("/Admin/AdminStat"); // Admin dashboard
        }
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
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
          <img src={logo} alt="Logo" className="logo" />
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
          <p>Un message quelconque qui s'affiche</p>         {/* a changer */ }
          <form className="sign-in-form">
            <input
              onChange={(e) => setIdentifier(e.target.value)} // Input for mail or name
              value={identifier}
              type="text" // Use text for both mail or name
              id="identifier"
              placeholder={isMember ? "Mail" : "Name"} // Adjust placeholder dynamically
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <div className="keep-logged-in">
              <input type="checkbox" id="keep-logged-in" />
              <label htmlFor="keep-logged-in">Keep me logged in</label>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

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


            <button
              type="submit"
              className="submit-button"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
