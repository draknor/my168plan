import * as React from 'react';
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


const TagArray = () => {
  const tags = [
    { id: 1, name: "Sleep", count: 0 },
    { id: 2, name: "Eat", count: 0 },
    { id: 3, name: "Family Time", count: 0 },
    { id: 4, name: "Work", count: 0 },
    { id: 5, name: "Recreation", count: 0 },
  ];

  return tags;
}

const App = () => {
  const [tags, setTags] = React.useState(TagArray());
  return (
    <Container maxWidth={"lg"}>
      <Header />
      <TagCollection tags={tags}/>
      <WeeklyPlan tags={tags}/>
      <Footer />
    </Container>
  );
}

export default App;

