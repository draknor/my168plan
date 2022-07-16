import './App.css';
import TagCollection from "./components/TagCollection";
import WeeklyPlan from "./components/WeeklyPlan";

const App = () => {
  return (
    <div className="App">
      <div className={"App-header"}>
        <h3>My168Planner</h3>
      </div>
      <TagCollection />
      <WeeklyPlan />
    </div>
  );
}

export default App;
