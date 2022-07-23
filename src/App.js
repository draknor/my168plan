import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";
import {getTimeslots} from "./components/Timeslot";
import {useCookies} from "react-cookie";

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

  const handleSaveClick = () => {
    // console.log("handleSaveClick - TBD");
    setCookie('tags',tags);
    setCookie('plan',planArray);
  }

  const handleClearClick = () => {
    setTags(ResetTagArray());
    setPlanArray(ResetPlanArray()); //TODO this doesn't clear the TagMenu selected items - how to do that?!
    removeCookie('tags');
    removeCookie('plan');
  }

  return (
    <Container maxWidth={"lg"}>
      <Header saveOnClick={handleSaveClick} clearOnClick={handleClearClick}/>
      <TagCollection tags={tags}/>
      <WeeklyPlan tags={tags} setTags={setTags} planArray={planArray} setPlanArray={setPlanArray} />
      <Footer />
    </Container>
  );
}

export default App;

