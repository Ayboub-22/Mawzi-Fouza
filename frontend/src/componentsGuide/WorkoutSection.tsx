import Schedule from "./Schedule";
import "./Schedule.css";

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
  ScheduleData: Schedule1[];
  imgSrc?: string;
};

function WorkoutSection({
  title,
  description,
  buttonText,
  ScheduleData,
  imgSrc,
}: WorkoutSectionProp) {
  return (
    <section className="YSection">
      <div className="YDiv1">
        <h1 className="YTitle2">{title}</h1>
        <p className="YPar1">{description}</p>
        <button className="YBoutton1">{buttonText}</button>
        {/* Pass the Schedules array directly */}
        <div className="YimgSchedule">
          {ScheduleData.map((item, index) => (
            <Schedule
              key={index}
              img={item.img}
              date={item.date}
              period={item.period}
              message={item.message}
            />
          ))}
        </div>
      </div>
      <img className="Yimg2" src={imgSrc} />
    </section>
  );
}

export default WorkoutSection;
