import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './components/ProTip';
import Footer from './components/Footer';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";



const App = () => {
  return (
    <Container maxWidth={"lg"}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example
        </Typography>
        <ProTip />
      </Box>
      <div className={"App-header"}>
        <h3>My168Planner</h3>
      </div>
      <TagCollection />
      <WeeklyPlan />
      <Footer />
    </Container>
  );
}

export default App;

