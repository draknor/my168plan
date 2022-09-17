import * as React from 'react';
import Day from './Day';
import TimeslotRowHeader from "./TimeslotRowHeader";
import Grid from "@mui/material/Grid";

const WeeklyPlan = (props) => {
  const plan=props.plan;
  const setPlan=props.setPlan;
  const tags=props.tags;
  const tagStats=props.tagStats;
  const setTagStats = props.setTagStats;

  const handleClick = (e, newTagId, oldTagId, timeslotIndex, weekday) => {
    //console.log(`WeeklyPlan.handleClick[e.target], ${e.target}`);
    // console.log(`WeeklyPlan.handleClick[weekday,timeslotIndex]=(${weekday},${timeslotIndex})`);
    // console.log('WeeklyPlan.handleClick[newTag]', newTag);
    //console.log('WeeklyPlan.handleClick[oldTag]', oldTag);

    if ( (newTagId ? newTagId : null) !== (oldTagId ? oldTagId : null) ) {
      // Update the plan
      let newPlan = plan.slice();
      newPlan[weekday][timeslotIndex] = newTagId;
      setPlan(newPlan);

      // Then update the tag counts
      const updatedTagStats = tagStats.map(tagStat => {
        // console.log('map(tag)-before',tagStat);
        if (oldTagId && tagStat.id === oldTagId) { return {...tagStat, count: --tagStat.count}; }
        if (newTagId && tagStat.id === newTagId) { return {...tagStat, count: ++tagStat.count}; }
        // console.log('map(tag)-after',tagStat);
        return tagStat;
      })
      //console.log('WeeklyPlan.handleClick[updatedTags]', updatedTags);
      setTagStats(updatedTagStats);
    }
  }

  return (
    <div className={"weeklyPlan"}>
      <Grid container spacing={0.5} columns={8}>
        <Grid item xs={1} >
          <TimeslotRowHeader
            timeslots={plan[0]}
          />
        </Grid>
        { plan.map((e, weekday) => {
          return (
            <Grid item xs={1} key={weekday}>
              <Day
                plan={plan}
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