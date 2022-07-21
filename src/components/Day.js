import Timeslot from "./Timeslot";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Day = (props) => {
  const day = props.day;
  const name = day.name;
  const timeslots = day.timeslots;
  const onClick = props.onClick;

  return (
    <div className={"day"}>
      <Grid container spacing={0} columns={1}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
      </Grid>
      { timeslots.map((timeslot, num) => {
        return (
          <Grid item xs={1}>
            <Timeslot
              key={num}
              timeslot={timeslot}
              onClick={onClick}
            />
          </Grid>
        )
      })}

    </div>

  );

}

export default Day;