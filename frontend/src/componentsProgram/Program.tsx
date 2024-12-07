import React, { useState } from "react";
import "./Program.css";

interface Section {
  title: string;
  content: JSX.Element;
}

interface Day {
  day: string;
  description: string;
  sections: Section[];
}

interface OfferProps {
  title: string;
  workoutProgram: Day[];
}

const Offer: React.FC<OfferProps> = ({ title, workoutProgram }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="Programcontainer">
      <div className="left-panel">
        <h1 className="Programtitle">{title}</h1>
        <ul>
          {workoutProgram.map((day, index) => (
            <li
              key={index}
              className={selectedDay === index + 1 ? "active" : ""}
              onClick={() => setSelectedDay(index + 1)}
            >
              {day.day}
            </li>
          ))}
        </ul>
        <p>{workoutProgram[selectedDay - 1].description}</p>
      </div>

      <div className="right-panel">
        {workoutProgram[selectedDay - 1].sections.map((section, index) => (
          <section className="section" key={index}>
            <h2>{section.title}</h2>
            <div className="SectionGuide">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Program;
