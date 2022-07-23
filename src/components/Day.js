import Timeslot from "./Timeslot";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Day = (props) => {
  const timeslots = props.dayArray;
  const weekday = props.weekday;
  const tags = props.tags;
  const planOnClick = props.onClick;

  const handleClick = (event, newTag, oldTag, timeslotIndex) => {
    planOnClick(event, newTag, oldTag, timeslotIndex, weekday);
  }

  return (
    <div className={"day"}>
      <Grid container spacing={0} columns={1}>
        <Typography variant="h6" gutterBottom>
          {getDayName(weekday)}
        </Typography>
      </Grid>
      { timeslots.map((selectedTag, num) => {
        return (
          <Grid item xs={1} key={num}>
            <Timeslot
              selectedTag={selectedTag}
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