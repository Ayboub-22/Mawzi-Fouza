import "./Schedule.css";

type Schedule1 = {
  img: string;
  date: string;
  period: string;
  message: string;
};

function Schedule({ img, date, period, message }: Schedule1) {
  return (
    <>
      <div
        className="YimgSchedule1"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "Cover",
          backgroundPosition: "center",
        }}
      >
        <div className="Ymsg1_Schedule">
          <h5 className="YdateSchedule1 badge">
            <img className="Ybadge-icon" src="./image 5.png" />
            {date}
          </h5>
          <h5 className="YdateSchedule2 badge">
            <img className="Ybadge-icon" src="./image 6.png" />
            {period}
          </h5>

          <h1 className="Ymsg2_Schedule">{message}</h1>
        </div>
      </div>
    </>
  );
}

export default Schedule;
