import Timeslot, { getTimeslotNameCollection } from './Timeslot';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TimeslotRowHeader = (props) => {
  const timeslots = props.timeslots
  const headerNames = getTimeslotNameCollection(timeslots)

  return (
    <div className={"timeslotRowsHeader"}>
      <Grid container spacing={0} columns={1}>
        <Typography variant="h6" gutterBottom>
          &nbsp;
        </Typography>
        { headerNames.map((timeslot, num) => {
          return (
            <Grid item xs={1}>
              <div key={num} className={"timeslotRowHeader"}>
              {headerNames[num]}
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>


  );
}

export default TimeslotRowHeader;