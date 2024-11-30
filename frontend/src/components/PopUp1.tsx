import "./PopUp1.css";
import { usePopup } from "./PopupContext";
import logo from "../assets/icons/logo.png";

import React from "react";


function PopUp1() {
  const { isPopup1Visible, togglePopup, closePopup1 } = usePopup();

  if (!isPopup1Visible) return null;

  return (
    <div className="PopUp">
      <div className="Form2">
        <button
          className="close-button"
          onClick={closePopup1}
          aria-label="Close popup"
        >
          ✕
        </button>
        <div className="Head">
        <img src={logo} alt="Logo" className="logo" />
          <div className="tit">
            <h2>Join us now !!!</h2>
          </div>
        </div>
        <div className="Form1">
          <h1>Sign up</h1>
          <p>Join us by filling out the information below</p>
          <form className="sign-up-form">
            <div className="birt">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                required
              />

              <input
                type="text"
                id="cin"
                placeholder="Enter your CIN"
                required
              />
            </div>
            <div className="birt">
              <input
                type="text"
                id="username"
                placeholder="User Name"
                required
              />
              <input
                type="date"
                id="birthdate"
                placeholder="Birth Date"
                required
              />
            </div>
            <div className="birt">
              <input
                type="tel"
                id="phone"
                placeholder="Contact Number"
                required
              />
              <input type="text" id="sex" placeholder="Sex" required />
            </div>

            <div className="birthdate-sex">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="have-account">
              Have an account?{" "}
              <a
                onClick={() => {
                  closePopup1();
                  togglePopup();
                }}
              >
                Sign in
              </a>
            </div>

            <button type="submit" className="submit-button">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUp1;
