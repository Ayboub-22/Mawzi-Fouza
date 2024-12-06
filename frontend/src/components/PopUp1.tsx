import "./PopUp1.css";
import { usePopup } from "./PopupContext";
import logo from "../assets/icons/logo.png";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PopUp1() {
  const navigate = useNavigate(); // Navigation hook
  const [cin, setCin] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [tel, setTel] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [mdp, setMdp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isPopup1Visible, togglePopup, closePopup1 } = usePopup();

  if (!isPopup1Visible) return null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        cin,
        name,
        mail,
        tel,
        birth,
        sex,
        mdp,
      });

      if (response.status === 201) {
        console.log("User created successfully:", response.data);
        const userCin1 = response.data.user.cin;
        console.log(userCin1);
        navigate("/espaceuser", { state: { userCin1 } }); // User home page               !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setErrorMessage(
          "Signup successful! Please check your email to verify your account."
        );

        // Optionally, close the popup here
        //closePopup1();
      }
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };


  return (
    <div className="PopUp">
      <div className="Form2">
        <button
          className="close-button"
          onClick={closePopup1}
          aria-label="Close popup"
        >
          X
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
          <form className="sign-up-form" onSubmit={handleSignUp}>
            <div className="birt">
              <input
                type="email"
                placeholder="Enter your email address"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Enter your CIN"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>
            <div className="birt">
              <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="Birth Date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                required
              />
            </div>
            <div className="birt">
              <input
                type="tel"
                placeholder="Contact Number"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
              />
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Sex
                </option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="birthdate-sex">
              <input
                type="password"
                placeholder="Enter your password"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="submit-button" onClick={handleSignUp}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUp1;
