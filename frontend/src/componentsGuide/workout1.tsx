import { useNavigate } from "react-router-dom";
import "./Workout1.css";

type Qualification = {
  text: string;
  imgSrc?: string;
  name: string; // Added name field
  id:number;
};

type QualsProps = {
  qualifications: Qualification[];
};

function Workout1({ userCin1}:any) {

  const navigate=useNavigate();


  const qualifications = [
    {
      text: "Start Now",
      imgSrc: "/Group 156.png",
      name: " Full Body Strength Training", // Added name
      id:0,
    },
    {
      text: "Start Now",
      imgSrc: "/Yoga.png",
      name: "Push/Pull/Legs Split", // Added name
      id:1,
    },
    {
      text: "Start Now",
      imgSrc: "/bodyweight.png",
      name: "Bodyweight Workout", // Added name
      id:2,
    },
    {
      text: "Start Now",
      imgSrc: "/hit.png",
      name: "HIIT Workout", // Added name
      id:3,
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
      name: "Strength and Conditioning", // Added name
      id:4,
    },
  ];

  return (
    <div className="YWorkouts">
      {qualifications.map((item, index) => (
        <div key={index} className="YWorkout1">
          <div className="Yimage-container">
            <img src={item.imgSrc} alt="Qualification" className="Yimg1" />
            <div className="Yblur-overlay">
              <div className="Yoverlay-text">{item.name}</div>{" "}
              {/* Use dynamic name */}
            </div>
          </div>
          <button className="YBoutton" onClick={()=>navigate('/prog',{ state: { userCin1, id:item.id } })}>{item.text} </button>
        </div>
      ))}
    </div>
  );
}

export default Workout1;
