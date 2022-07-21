import Day from './Day';
import Timeslot, {getTimeslots} from './Timeslot';
import TimeslotRowHeader from "./TimeslotRowHeader";
import Grid from "@mui/material/Grid";
import TagMenu from "./TagMenu";

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
      <Grid container spacing={0.5} columns={8}>
        <Grid item xs={1} >
          <TimeslotRowHeader
            timeslots={days[0].timeslots}
          />
        </Grid>
        { days.map((day, dayNum) => {
          return (
            <Grid item xs={1}>
              <Day
                key={dayNum}
                day={day}
                onClick={handleClick}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export default WeeklyPlan;