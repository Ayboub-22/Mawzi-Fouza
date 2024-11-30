import "./Workout.css";

type Qualification = {
  text: string;
  imgSrc?: string;
};

type QualsProps = {
  qualifications: Qualification[];
};

function Workout() {
  const qualifications = [
    {
      text: "Start Now",
      imgSrc: "/Group 156.png",
    },
    {
      text: "Start Now",
      imgSrc: "/Yoga.png",
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
    },
    {
      text: "Start Now",
      imgSrc: "/Cardio 1.png",
    },
  ];

  return (
    <div className="YDiv3">
      {qualifications.map((item, index) => (
        <div key={index} className="YWorkout1">
          <div className="Yimage-container">
            <img src={item.imgSrc} alt="Qualification" className="Yimg1" />
            <div className="Yblur-overlay">
              <div className="Yoverlay-text">Yassine Arfaoui</div>
            </div>
          </div>
          <button className="YBoutton">{item.text}</button>
        </div>
      ))}
    </div>
  );
}

export default Workout;
