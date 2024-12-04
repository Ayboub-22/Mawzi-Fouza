import NavBar from "./components/NavBar";
import Workout from "./componentsGuide/Workout";
import "./Guide.css";
import WorkoutSection from "./componentsGuide/WorkoutSection";
import Footer from "./components/Footer";
import { PopupProvider } from "./components/PopupContext";
import PopUp from "./components/PopUp";
import "./components/PopUp.css";
import PopUp1 from "./components/PopUp1";

type Schedule1 = {
  img: string;
  date: string;
  period: string;
  message: string;
};

type WorkoutSectionProp = {
  title: string;
  description: string;
  buttonText: string;
  ScheduleData: Schedule1[]; // Correct the type here to match the array of schedules
  imgSrc?: string;
};

type WorkoutSectionProps = {
  list: WorkoutSectionProp[];
};

function App() {
  const list = [
    {
      title: "Beginner Friendly",
      description:
        "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
      buttonText: "1938+ People Tried",
      ScheduleData: [
        {
          img: "/Image27.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image22.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image28.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Beginner Friendly",
      description:
        "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
      buttonText: "1938+ People Tried",
      ScheduleData: [
        {
          img: "/Image31.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image35.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image36.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Beginner Friendly",
      description:
        "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
      buttonText: "1938+ People Tried",
      ScheduleData: [
        {
          img: "/Image37.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image38.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image66.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Beginner Friendly",
      description:
        "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
      buttonText: "1938+ People Tried",
      ScheduleData: [
        {
          img: "/Image22.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image28.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image31.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Beginner Friendly",
      description:
        "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
      buttonText: "1938+ People Tried",
      ScheduleData: [
        {
          img: "/Image35.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image36.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/Image37.png",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    // Other items follow the same structure...
  ];

  return (
    <>
      <section className="YSection">
        <PopupProvider>
          <NavBar />

          <div className="YDiv1 padd">
            <h1 className="YTitle1">Free Workout Programs</h1>
            <Workout />
          </div>
          <img className="Yimg2" src="/Message 21.png" alt="Workout" />

          <PopUp />
          <PopUp1 />
        </PopupProvider>
      </section>
      {list.map((item, index) => (
        <WorkoutSection
          key={index}
          title={item.title}
          description={item.description}
          buttonText={item.buttonText}
          ScheduleData={item.ScheduleData} // Ensure the correct name here
          imgSrc={item.imgSrc}
        />
      ))}

      <Footer />
    </>
  );
}

export default App;
