import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagSummary from "./components/TagSummary";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";
//import {useCookies} from "react-cookie";
import {Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {ResetPlan, ResetTags, ResetTagStats} from "./operations/reset";
import {SavePlan, LoadPlan} from "./operations/database";

const App = () => {
  const [tags, setTags] = React.useState(ResetTags());
  const [plan, setPlan] = React.useState(ResetPlan());
  const [tagStats, setTagStats] = React.useState(ResetTagStats(tags, plan));
  //const [cookies, setCookie] = useCookies(['plan','tags'])
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

  const handleClearClick = () => {
    setPlan(ResetPlan());
    setTags(ResetTags());
    setTagStats(ResetTagStats(tags, plan));
    setAlert({open: true, severity: 'warning', msg:'Cleared!'})
  }

  const handleSaveClick = () => {
    let newPlanId = SavePlan('', {planArray: plan, tagArray: tags})

    if (newPlanId !=='') {
      //setPlanId(newPlanId);
      setAlert({open: true, severity: 'success', msg:`Saved plan with id ${newPlanId}`})
    } else {
      setAlert({open: true, severity: 'error', msg:'Save failed!'})
    }

  }

  const handleLoadClick = () => {
    // TODO - display modal to prompt for planId
    // Then attempt to load

    let planObj = LoadPlan('');
    setPlan(planObj.planArray);
    setTags(planObj.tagArray);

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

