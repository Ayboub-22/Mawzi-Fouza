import React, { createContext, useContext, useState } from "react";

interface ScheduleContextType {
  schedule: Record<string, string[]>;
  addClass: (day: string, time: number, name: string) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    Monday: ["", "", "", "", "", "", "", ""],
    Tuesday: ["", "", "", "", "", "", "", ""],
    Wednesday: ["", "", "", "", "", "", "", ""],
    Thursday: ["", "", "", "", "", "", "", ""],
    Friday: ["", "", "", "", "", "", "", ""],
    Saturday: ["", "", "", "", "", "", "", ""],
    Sunday: ["", "", "", "", "", "", "", ""],
  });

  const addClass = (day: string, time: number, name: string) => {
    setSchedule((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay[time - 1] = name; // Update the correct time slot
      return { ...prev, [day]: updatedDay };
    });
  };

  return (
    <ScheduleContext.Provider value={{ schedule, addClass }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context)
    throw new Error("useSchedule must be used within a ScheduleProvider");
  return context;
};
