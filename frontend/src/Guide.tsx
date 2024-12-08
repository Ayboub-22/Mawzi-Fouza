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
        "New to fitness? Start with these beginner-friendly programs! These offer shorter time commitments and low-impact options to help ease you into your fitness journey.",
      buttonText: "340+ People Tried",
      ScheduleData: [
        {
          img: "/beg1.jpg",
          date: "14 days",
          period: "20-40mins",
          message: "2023 Get Abs Challenge",
        },
        {
          img: "/beg2.jpg",
          date: "14 days",
          period: "20-40mins",
          message: "Beginner Cardio Routine",
        },
        {
          img: "/beg3.jpg",
          date: "14 days",
          period: "20-40mins",
          message: "Total Body Strength Training",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Intermediate",
      description:
        "Ready to take your fitness to the next level? These intermediate programs are designed for those who have built a basic level of fitness and are ready for a more challenging routine.",
      buttonText: "400+ People Tried",
      ScheduleData: [
        {

//           img: "/Image31.png",
//           date: "14 days",
//           period: "20-40mins",
//           message: "2023 Get Abs Challenge",
//         },
//         {
//           img: "/Image35.png",
//           date: "14 days",
//           period: "20-40mins",
//           message: "2023 Get Abs Challenge",
//         },
//         {
//           img: "/Image36.png",
//           date: "14 days",
//           period: "20-40mins",
//           message: "2023 Get Abs Challenge",
          img: "/inter1.jpg",
          date: "30 days",
          period: "30-60mins",
          message: "Intermediate Strength Training",
        },
        {
          img: "/inter2.jpg",
          date: "30 days",
          period: "30-60mins",
          message: "Cardio Blast Challenge",
        },
        {
          img: "/inter3.jpg",
          date: "30 days",
          period: "30-60mins",
          message: "Flexibility & Mobility Program",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    {
      title: "Advanced",
      description:
        "Push your limits with these advanced programs! Perfect for experienced fitness enthusiasts looking for high-intensity routines to maximize performance and results.",
      buttonText: "300+ People Tried",
      ScheduleData: [
        {
        //   img: "/Image37.png",
        //   date: "14 days",
        //   period: "20-40mins",
        //   message: "2023 Get Abs Challenge",
        // },
        // {
        //   img: "/Image38.png",
        //   date: "14 days",
        //   period: "20-40mins",
        //   message: "2023 Get Abs Challenge",
        // },
        // {
        //   img: "/Image66.png",
        //   date: "14 days",
        //   period: "20-40mins",
        //   message: "2023 Get Abs Challenge",

          img: "/adv1.jpg",
          date: "60 days",
          period: "45-75mins",
          message: "Advanced HIIT Challenge",
        },
        {
          img: "/adv2.jpg",
          date: "60 days",
          period: "45-75mins",
          message: "Strength & Power Training",
        },
        {
          img: "/adv3.jpg",
          date: "60 days",
          period: "45-75mins",
          message: "Ultimate Endurance Program",
        },
      ],
      imgSrc: "/Message 21.png",
    },
    // {
    //   title: "Beginner Friendly",
    //   description:
    //     "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
    //   buttonText: "1938+ People Tried",
    //   ScheduleData: [
    //     {
    //       img: "/Image22.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //     {
    //       img: "/Image28.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //     {
    //       img: "/Image31.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //   ],
    //   imgSrc: "/Message 21.png",
    // },
    // {
    //   title: "Beginner Friendly",
    //   description:
    //     "Looking to get started on your fitness journey? Try one of these beginner-friendly programs! These have shorter time commitments or have low-impact alternatives.",
    //   buttonText: "1938+ People Tried",
    //   ScheduleData: [
    //     {
    //       img: "/Image35.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //     {
    //       img: "/Image36.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //     {
    //       img: "/Image37.png",
    //       date: "14 days",
    //       period: "20-40mins",
    //       message: "2023 Get Abs Challenge",
    //     },
    //   ],
    //   imgSrc: "/Message 21.png",
    // },
    // Other items follow the same structure...

  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <section className="YSection">
        <PopupProvider>
          <NavBar />

          <div className="YDiv1 padd">
            <h1 className="YTitle1">Free Workout Programs</h1>
            <Workout />
          </div>
          <img
            className="Yimg2"
            src="/Message 21.png"
            alt="Workout"
            onClick={scrollToTop} // Add this onClick handler
            style={{ cursor: "pointer" }} // Make it look clickable
          />
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
