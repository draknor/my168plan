import {getTimeslots} from "../components/Timeslot";

const ResetTags = () => {
  return [
    { id: 1, name: "Sleep", cssClass: 'tagColor1' },
    { id: 2, name: "Eat", cssClass: 'tagColor2' },
    { id: 3, name: "Family Time", cssClass: 'tagColor3' },
    { id: 4, name: "Work", cssClass: 'tagColor6' },
    { id: 5, name: "Recreation", cssClass: 'tagColor5' },
  ];
}


const ResetPlan = () => {
  let plan = Array(7);
  for (let weekday=0; weekday<plan.length; weekday++) {
    let timeslots = getTimeslots(weekday);
    plan[weekday] = Array(timeslots.length);
    timeslots.map((timeslot, index) => {
      plan[weekday][index] = null
      return null;
    })
  }

  return plan;
}

const ResetTagStats = (tags, plan) => {
  let tagStats = tags.map(tag => {
    return {
      id: tag.id,
      count: 0
    };
  })
  let tagIndex = {}
  tagStats.forEach((tag, index) => { tagIndex[tag.id] = index})

  for (let weekday=0; weekday<plan.length; weekday++) {
    for (let timeslot=0; timeslot<plan[weekday].length; timeslot++) {
      let tagId = plan[weekday][timeslot];
      if (tagId && tagIndex[tagId]) { ++tagStats[tagIndex[tagId]].count }
    }
  }
  return tagStats;

}

export {ResetPlan, ResetTags, ResetTagStats}