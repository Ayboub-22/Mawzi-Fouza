import "./PopUp.css";
import { usePopup } from "./PopupContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 

import logo from "../assets/icons/logo.png";


function getClassName(isActive: boolean): string {
  return isActive ? "boutton1 active" : " boutton1 inactive";
}
function getClassName1(isActive: boolean): string {
  return isActive ? "boutton2 inactive" : "boutton2 active";
}

function PopUp() {

  const navigate = useNavigate(); // Hook pour naviguer vers une autre route
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
  
    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:3000/admin/login", {
        name,
        password,
      });
  
      if (response.status === 200) {
        // Successful login
        console.log("Login successful:", response.data);
        navigate("/Admin/AdminStat"); // Redirect to the dashboard
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error: any) {
      // Handle errors
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
          <p>un essage quelcoque sui affiche</p>
          <form className="sign-in-form">
            <input onChange={(e)=>setName(e.target.value)} value={name} type="email" id="email" placeholder="mail" required />


            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}

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

            <button type="submit" className="submit-button" onClick={handleSignIn}>

              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PopUp;
