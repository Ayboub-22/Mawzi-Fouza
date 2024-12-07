import "./Workout.css";

type Qualification = {
  text: string;
  imgSrc?: string;
<<<<<<< HEAD
  text2: string;
=======
  name: string; // Added name field
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
};

type QualsProps = {
  qualifications: Qualification[];
};

function Workout() {
  const qualifications = [
    {
      text: "Start Now",
      imgSrc: "/Group 156.png",
<<<<<<< HEAD
      text2: "Start Now",
=======
      name: " Full Body Strength Training", // Added name
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
    },
    {
      text: "Start Now",
      imgSrc: "/Yoga.png",
<<<<<<< HEAD
      text2: "Start Now",
=======
      name: "Push/Pull/Legs Split", // Added name
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
<<<<<<< HEAD
      text2: "Start Now",
=======
      name: "Bodyweight Workout", // Added name
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
<<<<<<< HEAD
      text2: "Start Now",
=======
      name: "HIIT Workout", // Added name
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
<<<<<<< HEAD
      text2: "Start Now",
=======
      name: "Strength and Conditioning", // Added name
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
    },
  ];

  return (
    <div className="YWorkouts">
      {qualifications.map((item, index) => (
        <div key={index} className="YWorkout1">
          <div className="Yimage-container">
            <img src={item.imgSrc} alt="Qualification" className="Yimg1" />
            <div className="Yblur-overlay">
<<<<<<< HEAD
              <div className="Yoverlay-text">{item.text2}</div>
=======
              <div className="Yoverlay-text">{item.name}</div>{" "}
              {/* Use dynamic name */}
>>>>>>> 8441e470dfb72a196367d3bddc98a986e9e5c4f5
            </div>
          </div>
          <button className="YBoutton">{item.text}</button>
        </div>
      ))}
    </div>
  );
}

export default Workout;
