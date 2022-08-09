import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";
import {getTimeslots} from "./components/Timeslot";
import {useCookies} from "react-cookie";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// This will eventually be replaced with a function/component to retrieve the tags from a user/data store
const ResetTagArray = () => {
  return [
    { id: 1, name: "Sleep", count: 0 },
    { id: 2, name: "Eat", count: 0 },
    { id: 3, name: "Family Time", count: 0 },
    { id: 4, name: "Work", count: 0 },
    { id: 5, name: "Recreation", count: 0 },
  ];
}

// This will eventually be replaced with a function/component to retrieve the plan from a user/data store
const ResetPlanArray = () => {
  let plan = Array(7);
  for (let weekday=0; weekday<plan.length; weekday++) {
    let timeslots = getTimeslots(weekday);
    plan[weekday] = Array(timeslots.length);
    timeslots.map((timeslot, index) => {
      plan[weekday][index] = null
      return null;
    })
  }

  return plan;
}


const App = () => {
  const [tags, setTags] = React.useState(ResetTagArray());
  const [planArray, setPlanArray] = React.useState(ResetPlanArray());
  const [cookies, setCookie, removeCookie] = useCookies(['weeklyPlan'])
  const [alert, setAlert] = React.useState({open: false});

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
  });

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({open: false});
  }

  const handleSaveClick = () => {
    // console.log("handleSaveClick - TBD");
    setCookie('tags',tags);
    setCookie('plan',planArray);
    setAlert({open: true, severity: 'success', msg:'Saved!'})
  }

  const handleClearClick = () => {
    setPlanArray(ResetPlanArray()); //TODO this doesn't clear the TagMenu selected items - how to do that?!
    setTags(ResetTagArray());
    removeCookie('tags');
    removeCookie('plan');
    setAlert({open: true, severity: 'warning', msg:'Deleted!'})
  }

  const handleLoadClick = () => {
    if (cookies.tags) { setTags(cookies.tags); }
    if (cookies.plan) { setPlanArray(cookies.plan); }
    setAlert({open: true, severity: 'success', msg:'Loaded!'})
  }

  return (
    <Container maxWidth={"lg"}>
      <Header saveOnClick={handleSaveClick} clearOnClick={handleClearClick} loadOnClick={handleLoadClick}/>
      <TagCollection tags={tags}/>
      <WeeklyPlan tags={tags} setTags={setTags} planArray={planArray} setPlanArray={setPlanArray} />
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>{alert.msg}</Alert>
      </Snackbar>
      <Footer />
    </Container>
  );
}

export default App;

