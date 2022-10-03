import {getTimeslots} from "../components/Timeslot";

const ResetTags = () => {
  return [
    { id: 1, name: "Sleep", cssClass: 'tagColor1', comment: "Sleep 8 hours per night" },
    { id: 2, name: "Eat", cssClass: 'tagColor6', comment: "Spend an hour prepping, cooking, cleaning per meal, 3 meals/day"},
    { id: 3, name: "Family Time", cssClass: 'tagColor3', comment: "Spend time with my family / close friends" },
    { id: 4, name: "Work", cssClass: 'tagColor9', comment: "Work 8-5 every week day (with one-hour lunch break)"},
    { id: 5, name: "Recreation", cssClass: 'tagColor5', comment: "Spend time playing games, sports, reading, watching movies"},
    { id: 6, name: "Spirituality", cssClass: 'tagColor2', comment: "Spend time praying, meditating, attending religious services"},
  ];
}

const DefaultPlan = () => {
  let plan = Array(7);
  // Setup a default plan
  plan[0] = [1, 1, 1, 1, 1, 1, 1, 2, null, null, null, null, 2, null, null, null, null, 2, null, null, null, null, null, 1 ];
  plan[1] = [1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 5, 5, 3, 3, 6, 1 ];
  plan[2] = [1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 5, 5, 3, 3, 6, 1 ];
  plan[3] = [1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 5, 5, 3, 3, 6, 1 ];
  plan[4] = [1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 5, 5, 3, 3, 6, 1 ];
  plan[5] = [1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 5, 5, 3, 3, 6, 1 ];
  plan[6] = [1, 1, 1, 1, 1, 1, 1, 2, null, null, null, null, 2, null, null, null, null, 2, null, null, null, null, null, 1 ];
  return plan;
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

const RecalcTagStats = (tags, plan) => {
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
      if (tagId) {
        ++tagStats[tagIndex[tagId]].count
      }
    }
  }
  return tagStats;

}

export {DefaultPlan, ResetPlan, ResetTags, RecalcTagStats}