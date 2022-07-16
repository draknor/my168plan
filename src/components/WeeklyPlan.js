import Day from './Day';
import Timeslot, {getTimeslots} from './Timeslot';
import TimeslotRowHeader from "./TimeslotRowHeader";

const WeeklyPlan = () => {
  const days = [
    { id: 0, name: 'Sunday', timeslots: getTimeslots(0) },
    { id: 1, name: 'Monday', timeslots: getTimeslots(1) },
    { id: 2, name: 'Tuesday', timeslots: getTimeslots(2) },
    { id: 3, name: 'Wednesday', timeslots: getTimeslots(3) },
    { id: 4, name: 'Thursday', timeslots: getTimeslots(4) },
    { id: 5, name: 'Friday', timeslots: getTimeslots(5) },
    { id: 6, name: 'Saturday', timeslots: getTimeslots(6) },
  ];

  const handleClick = (e) => {
    let content = e.target.innerHTML;
    e.target.innerHTML = content ? '' : e.target.id

    // console.log(e.target);
  }

  return (
    <div className={"weeklyPlan"}>
      <TimeslotRowHeader
        timeslots={days[0].timeslots}
      />

      { days.map((day, dayNum) => {
        return (
          <Day
            key={dayNum}
            day={day}
            onClick={handleClick}
          />
        )
      })}
    </div>
  );
}

export default WeeklyPlan;