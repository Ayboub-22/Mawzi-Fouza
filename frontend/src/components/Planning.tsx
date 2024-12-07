import React from "react";
import "./Planning.css";

const App = () => {
  const schedule = {
    Monday: ["8H-10H", "10H-12H", "14H-16H"],
    Tuesday: ["12H-14H", "16H-18H"],
    Wednesday: ["8H-10H", "18H-20H"],
    Thursday: ["10H-12H", "20H-22H"],
    Friday: ["14H-16H", "22H-24H"],
    Saturday: ["16H-18H", "18H-20H"],
    Sunday: ["10H-12H"],
  };

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
    <div className="Planning-container">
      <h1>Planning of the Week</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th className="Day"> </th>
            {periods.map((period) => (
              <th key={period}>{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {periods.map((period) => (
                <td
                  key={period}
                  className={
                    schedule[day as keyof typeof schedule].includes(period)
                      ? "classe"
                      : ""
                  }
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
