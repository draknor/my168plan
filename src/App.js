import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Footer from './components/Footer';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";
import Header from "./components/Header";

// This will eventually be replaced with a function/component to retrieve the tags from a user/data store
const TagArray = () => {
  return [
    { id: 1, name: "Sleep", count: 0 },
    { id: 2, name: "Eat", count: 0 },
    { id: 3, name: "Family Time", count: 0 },
    { id: 4, name: "Work", count: 0 },
    { id: 5, name: "Recreation", count: 0 },
  ];
}

const App = () => {
  const [tags, setTags] = React.useState(TagArray());

  return (
    <Container maxWidth={"lg"}>
      <Header />
      <TagCollection tags={tags}/>
      <WeeklyPlan tags={tags} setTags={setTags} />
      <Footer />
    </Container>
  );
}

export default App;

