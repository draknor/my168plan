import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagSummary from "./components/TagSummary";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";
import {getTimeslots} from "./components/Timeslot";
import {useCookies} from "react-cookie";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// This will eventually be replaced with a function/component to retrieve the tags from a user/data store
const ResetTags = () => {
  return [
    { id: 1, name: "Sleep", count: 0, cssClass: 'tagColor1' },
    { id: 2, name: "Eat", count: 0, cssClass: 'tagColor2' },
    { id: 3, name: "Family Time", count: 0, cssClass: 'tagColor3' },
    { id: 4, name: "Work", count: 0, cssClass: 'tagColor6' },
    { id: 5, name: "Recreation", count: 0, cssClass: 'tagColor5' },
  ];
}

// This will eventually be replaced with a function/component to retrieve the plan from a user/data store
const ResetPlan = () => {
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

const ResetTagStats = (tags, plan) => {
  let tagStats = tags.map(tag => {
    return {
      id: tag.id,
      count: 0
    };
  })
  let tagIndex = {}
  tagStats.forEach((tag, index) => { tagIndex[tag.id] = index})

  for (let weekday=0; weekday<plan.length; weekday++) {
    for (let timeslot=0; timeslot<plan[weekday].length; timeslot++) {
      let tagId = plan[weekday][timeslot];
      if (tagId && tagIndex[tagId]) { ++tagStats[tagIndex[tagId]].count }
    }
  }
  return tagStats;

}

const App = () => {
  const [tags, setTags] = React.useState(ResetTags());
  const [plan, setPlan] = React.useState(ResetPlan());
  const [tagStats, setTagStats] = React.useState(ResetTagStats(tags, plan));
  const [cookies, setCookie] = useCookies(['plan','tags'])
  const [alert, setAlert] = React.useState({open: false});

  const colorCollection = [
    {id: 1, name: 'Lavender', cssClass: 'tagColor1'},
    {id: 2, name: 'Purple', cssClass: 'tagColor2'},
    {id: 3, name: 'Blue', cssClass: 'tagColor3'},
    {id: 4, name: 'Aqua', cssClass: 'tagColor4'},
    {id: 5, name: 'Green', cssClass: 'tagColor5'},
    {id: 6, name: 'Yellow', cssClass: 'tagColor6'},
    {id: 7, name: 'Orange', cssClass: 'tagColor7'},
    {id: 8, name: 'Pink', cssClass: 'tagColor8'},
    {id: 9, name: 'Red', cssClass: 'tagColor9'},

  ]

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
    setCookie('tags',tags);
    setCookie('plan',plan);
    setAlert({open: true, severity: 'success', msg:'Saved!'})
  }

  const handleClearClick = () => {
    setPlan(ResetPlan());
    setTags(ResetTags());
    setAlert({open: true, severity: 'warning', msg:'Deleted!'})
  }

  const handleLoadClick = () => {
    if (cookies.tags) { setTags(cookies.tags); }
    if (cookies.plan) { setPlan(cookies.plan); }
    setAlert({open: true, severity: 'success', msg:'Loaded!'})
  }


  return (
    <Container maxWidth={"lg"}>
      <Header saveOnClick={handleSaveClick} clearOnClick={handleClearClick} loadOnClick={handleLoadClick}/>
      <TagSummary
          tags={tags}
          setTags={setTags}
          tagStats={tagStats}
          colors={colorCollection}
      />
      <br />
      <WeeklyPlan
          tags={tags}
          tagStats={tagStats}
          setTagStats={setTagStats}
          plan={plan}
          setPlan={setPlan}
      />
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alert.severity}>{alert.msg}</Alert>
      </Snackbar>
      <Footer />
    </Container>
  );
}

export default App;

