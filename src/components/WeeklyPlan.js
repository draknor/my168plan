import * as React from 'react';
import Day from './Day';
import TimeslotRowHeader from "./TimeslotRowHeader";
import Grid from "@mui/material/Grid";

const WeeklyPlan = (props) => {
  const planArray=props.planArray;
  const setPlanArray=props.setPlanArray;
  const tags=props.tags;
  const setTags = props.setTags;

  const handleClick = (e, newTag, oldTag, timeslotIndex, weekday) => {
    // console.log(`WeeklyPlan.handleClick[e.target] = ${e.target}`);
    // console.log(`WeeklyPlan.handleClick[weekday,timeslotIndex]=(${weekday},${timeslotIndex})`);
    // console.log('WeeklyPlan.handleClick[newTag]', newTag);
    // console.log('WeeklyPlan.handleClick[oldTag]', oldTag);

    if (newTag.id !== oldTag.id) {
      // Update the plan
      let newPlan = planArray.slice();
      newPlan[weekday][timeslotIndex] = newTag.id || null;
      setPlanArray(newPlan);

      // Then update the tag counts
      const updatedTags = tags.map(tag => {
        // console.log('map(tag)-before',tag);
        if (oldTag && tag.id === oldTag.id) { return {...tag, count: --tag.count}; }
        if (newTag && tag.id === newTag.id) { return {...tag, count: ++tag.count}; }
        // console.log('map(tag)-after',tag);
        return tag;
      })
      // console.log('WeeklyPlan.handleClick[updatedTags]', updatedTags);
      setTags(updatedTags);
    }
  }

  return (
    <div className={"weeklyPlan"}>
      <Grid container spacing={0.5} columns={8}>
        <Grid item xs={1} >
          <TimeslotRowHeader
            timeslots={planArray[0]}
          />
        </Grid>
        { planArray.map((dayArray, weekday) => {
          return (
            <Grid item xs={1} key={weekday}>
              <Day
                dayArray={dayArray}
                weekday={weekday}
                tags={tags}
                onClick={handleClick}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}

export default WeeklyPlan;