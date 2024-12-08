import React, { useState, useEffect } from "react";
import "./Planning1.css";
import { useNavigate } from "react-router-dom";
import PopupReserver from "./popupreserver";
import axios from "axios";

interface PopupProps {
  onClose: () => void;
  message: string;
}

interface Schedule {
  [key: string]: string[];
}

// Error Popup Component
const ErrorPopup: React.FC<PopupProps> = ({ onClose, message }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup1" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{message}</h2>
      </div>
    </div>
  );
};

function Planning1({ userCin1 }: { userCin1: string }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Updated to trigger the error popup
  const [schedule, setSchedule] = useState<Schedule>({
    Monday: ["", "", "", "", "", "", "", ""],
    Tuesday: ["", "", "", "", "", "", "", ""],
    Wednesday: ["", "", "", "", "", "", "", ""],
    Thursday: ["", "", "", "", "", "", "", ""],
    Friday: ["", "", "", "", "", "", "", ""],
    Saturday: ["", "", "", "", "", "", "", ""],
    Sunday: ["", "", "", "", "", "", "", ""],
  });

  const periods = [
    "8H-10H",
    "10H-12H",
    "12H-14H",
    "14H-16H",
    "16H-18H",
    "18H-20H",
    "20H-22H",
    "22H-24H",
  ];

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cours/getter");
      if (response.status === 200) {
        setSchedule(response.data);
      } else {
        setErrorMessage("Failed to fetch courses.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching courses.");
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle reservation confirmation
  const handleReservation1 = async (courseId: number) => {
    try {
      const response = await axios.post(`http://localhost:3000/reservation`, {
        userCin1: userCin1,
        courseId: courseId,
      });
      if (response.status === 200) {
        setShowSuccessPopup(true); // Show success popup
      }
    } catch (error: any) {
      if (error.response) {
        let errorMsg = "";
        switch (error.response.status) {
          case 400:
            errorMsg = "The course has already passed, you can't book!";
            break;
          case 401:
            errorMsg = "The course is complete!";
            break;
          default:
            errorMsg = "You have already booked this course. Thank you for waiting!";
        }
        setErrorMessage(errorMsg); // Show error message in popup
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle reservation button click
  const handleReservation = async () => {
    try {
      const response = await axios.post("http://localhost:3000/membre/reservation", { cin: userCin1 });
      const { adherent } = response.data;

      if (adherent) {
        setShowPopup(true); // Show reservation popup
      } else {
        navigate("/Offers1", { state: { userCin1 } }); // Redirect to offers page if not a member
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMessage("CIN not found!");
      } else {
        console.error("Error during membership check:", error);
        setErrorMessage("An error occurred during the membership check.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Planning of the Week</h1>

      <table className="schedule-table">
        <thead>
          <tr>
            <th className="Day"></th>
            {periods.map((period) => (
              <th key={period}>{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {schedule[day].map((className, index) => (
                <td key={index} className={className ? "filled" : ""}>
                  {className || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="book" onClick={handleReservation}>
        Booking
      </button>

      {showPopup && (
        <PopupReserver
          onClose={() => setShowPopup(false)}
          onReserve={handleReservation1}
        />
      )}

      {showSuccessPopup && (
        <div className="popup-overlay" onClick={() => setShowSuccessPopup(false)}>
          <div className="popup1" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowSuccessPopup(false)}>X</button>
            <h2>Booking done!</h2>
          </div>
        </div>
      )}

      {errorMessage && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}

export default Planning1;
