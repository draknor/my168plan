import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './components/ProTip';
import Footer from './components/Footer';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";



const App = () => {
  return (
    <Container maxWidth={"lg"}>
      <Header />
      <TagCollection />
      <WeeklyPlan />
      <Footer />
    </Container>
  );
}

export default App;

