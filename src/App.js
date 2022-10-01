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
import {ResetPlan, ResetTags, RecalcTagStats} from "./operations/reset";
import {SavePlan, LoadPlan} from "./operations/database";
import {useEffect} from "react";

const App = () => {
  const [tags, setTags] = React.useState(ResetTags());
  const [plan, setPlan] = React.useState(ResetPlan());
  const [tagStats, setTagStats] = React.useState(RecalcTagStats(tags, plan));
  const [toggleRecalc, setRecalc] = React.useState(true);
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

  useEffect(() => {
    setTagStats(RecalcTagStats(tags, plan));
    // We only want to call this on-demand, not every time tags or plan changes, so ignore this eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleRecalc]);

  const handleClearClick = () => {
    setPlan(ResetPlan());
    setTags(ResetTags());
    setRecalc(!toggleRecalc);
    setAlert({open: true, severity: 'warning', msg:'Cleared!'})
  }

  const handleSaveClick = async () => {
    //console.log("handleSaveClick"); // DEBUG
    let newPlanId = await SavePlan('', {planArray: plan, tagArray: tags})
    //console.log("handleSaveClick.newPlanId",newPlanId);

    if (newPlanId !=='') {
      setAlert({open: true, severity: 'success', msg:`Saved plan with id ${newPlanId}`})
    } else {
      setAlert({open: true, severity: 'error', msg:'Save failed!'})
    }

  }

  const handleLoadClick = async (planId) => {
    //console.log("App > handleLoadClick", planId); // DEBUG

    let planObj = await LoadPlan(planId);
    //console.log("App > handleLoadClick > Post-LoadPlan", planObj); // DEBUG
    if (Object.keys(planObj).length > 0) {
      setPlan(planObj.planArray);
      setTags(planObj.tagArray);
      setRecalc(!toggleRecalc);
      setAlert({open: true, severity: 'success', msg:'Loaded!'})
    }
    else {
      setAlert({open: true, severity: 'error', msg:`Plan ID ${planId} not found`})
    }
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

