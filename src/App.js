import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagSummary from "./components/TagSummary";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";
//import {useCookies} from "react-cookie";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {ResetTags, RecalcTagStats, DefaultPlan} from "./operations/reset";
import {SavePlan, LoadPlan} from "./operations/database";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const App = () => {
  const [tags, setTags] = React.useState(ResetTags());
  const [plan, setPlan] = React.useState(DefaultPlan());
  const [planId, setPlanId] = React.useState('');
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
    setPlanId('');
    setPlan(DefaultPlan());
    setTags(ResetTags());
    setRecalc(!toggleRecalc);
    setAlert({open: true, severity: 'warning', msg:'Reset to default!'})
  }

  const handleSaveClick = async () => {
    //console.log("handleSaveClick"); // DEBUG
    let newPlanId = await SavePlan(planId, {planArray: plan, tagArray: tags})
    //console.log("handleSaveClick.newPlanId",newPlanId);

    setPlanId(newPlanId);
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
      setPlanId(planId);
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
      <Header planId={planId} saveOnClick={handleSaveClick} clearOnClick={handleClearClick} loadOnClick={handleLoadClick}/>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel-whatis-header"
        >
          <Typography variant={"h6"}>What Is My168Plan?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            "Show me your calendar, and I will show you what you value".
            <br />
            <br />
            Many of us claim to value things we know are important - family & relationships, our health, our religion or spirituality - and yet we don't actively make time for them in our schedule.  The goal of this tool is to help visualize how you can make time for what you value during the 168 hours you have per week.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel-howuse-header"
        >
          <Typography variant={"h6"}>How do I use it?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is not a calendar / appointment tool. Instead, this tool is for you to experiment with allocating the hours of your week to your values. Now you can visualize how your week might look, and shift hours around to see how you might find time for everything you value.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Divider />
      <br />
      <TagSummary
          tags={tags}
          setTags={setTags}
          tagStats={tagStats}
          colors={colorCollection}
      />
      <br />
      <Divider />
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

