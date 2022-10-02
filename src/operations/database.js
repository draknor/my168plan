import {db} from "./firebase";
import { ref, set, get } from "firebase/database";
import { ResetPlan } from "./reset"

const idChars ='ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // Eliminate look-alike chars
const idLength=8;

async function SavePlan(planId, plan) {
  //console.log("SavePlan.planId", planId); //DEBUG
  if (planId === '') { planId = await generateNewId(); }
  await set(ref(db, 'plans/' + planId), {
    planArray: plan.planArray,
    tagArray: plan.tagArray
  });

  return planId;
}

function generateIdString() {
  let result = '';
  const charsLength = idChars.length;
  for ( let i = 0; i < idLength; i++ ) {
    result += idChars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

async function generateNewId() {
  let planId='';
  let planObj = {};
  let count = 5;
    do {
      planId = generateIdString();
      //console.log("generateNewId,planId",planId);  //DEBUG
      planObj = await LoadPlan(planId)
      //console.log("generateNewId,planObj",planObj) //DEBUG
      count--;  // don't let this run forever
    } while (Object.keys(planObj).length > 0 && count>0)

  return planId;
}

async function LoadPlan(planId) {
  planId = planId.toUpperCase();
  //console.log ("LoadPlan.planId", planId); // DEBUG
  let plan = {}
  let snapshot = await get(ref(db,`plans/${planId}`));
  //console.log ("LoadPlan.snapshot", snapshot); // DEBUG
  if (snapshot.exists()) {
    let obj = snapshot.val();
    plan.planArray = validatePlanArray(obj.planArray);
    plan.tagArray = obj.tagArray;
  }
  //console.log("LoadPlan.plan",plan)
  return plan
}

function validatePlanArray(planArray) {
  //console.log("validatePlanArray.planArray", planArray); //DEBUG
  const emptyPlan = ResetPlan();
  let newPlan = [];
  emptyPlan.forEach((timeslots, weekday) => {
    if (planArray[weekday] !== undefined) {
      newPlan[weekday] = [];
      timeslots.forEach((timeslot, index) => {
        if (planArray[weekday][index] !== undefined) {
          newPlan[weekday][index] = planArray[weekday][index];
        } else {
          newPlan[weekday][index] = emptyPlan[weekday][index];
        }
      })
    } else {
      newPlan[weekday] = emptyPlan[weekday];
    }
  })
  //console.log("validatePlanArray.newPlan", newPlan); //DEBUG

  return newPlan;
}

export {SavePlan, LoadPlan}