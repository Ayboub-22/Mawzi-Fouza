import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Planning.css";

const App = () => {
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    Monday: ["", "", "", "", "", "", "", ""],
    Tuesday: ["", "", "", "", "", "", "", ""],
    Wednesday: ["", "", "", "", "", "", "", ""],
    Thursday: ["", "", "", "", "", "", "", ""],
    Friday: ["", "", "", "", "", "", "", ""],
    Saturday: ["", "", "", "", "", "", "", ""],
    Sunday: ["", "", "", "", "", "", "", ""],
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to fetch courses from the backend
  const fetchCourses = async () => {
    try {
      // Send GET request to fetch courses
      const response = await axios.get("http://localhost:3000/cours/getter");

      if (response.status === 200) {
        // Assuming the response data is in a format where each day has a list of courses
        const cours = response.data; // Adjust this based on the actual structure of your response
        setSchedule(cours);
        console.log("hedha howa");
      } else {
        setErrorMessage("Failed to fetch courses.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred while fetching courses."
        );
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  // Use useEffect to fetch the courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

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

  return (
    <div className="container">
      <h1>Planning of the Week</h1>

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Day</th>
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
                  {className || ""} {/* If no class, show a placeholder */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
