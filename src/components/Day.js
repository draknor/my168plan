import Timeslot from "./Timeslot";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Day = (props) => {
  const planArray = props.planArray
  const weekday = props.weekday;
  const timeslots = planArray[weekday];
  const tags = props.tags;
  const handleClick = props.onClick;

  return (
    <div className={"day"}>
      <Grid container spacing={0} columns={1}>
        <Typography variant="h6" className={"dayHeader"} gutterBottom>
          {getDayName(weekday)}
        </Typography>
      </Grid>
      { timeslots.map((e, num) => {
        return (
          <Grid item xs={1} key={num}>
            <Timeslot
              planArray={planArray}
              weekday={weekday}
              timeslotIndex={num}
              tags={tags}
              onClick={handleClick}
            />
          </Grid>
        )
      })}

    </div>

  );

}

export default Day;

export const getDayName = (weekday) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  return (weekday >= 0 && weekday < dayNames.length) ? dayNames[weekday] : null

}