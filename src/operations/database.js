import {db} from "./firebase";
import { ref, set, get, child } from "firebase/database";

const idChars ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const idLength=8;

function SavePlan(planId, plan) {
  if (planId === '') { planId = generateNewId(); }
  set(ref(db, 'plans/' + planId), {
    planArray: plan.planArray,
    tagArray: plan.tagArray
  })

  return planId;
}

function generateIdString() {
  let result = ' ';
  const charsLength = idChars.length;
  for ( let i = 0; i < idLength; i++ ) {
    result += idChars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

function generateNewId() {
  let planId = generateIdString()
  /*
    while (LoadPlan(planId).length > 0) {
      planId = generateIdString();
    }
  */
  return planId;
}

function LoadPlan(planId) {
  let plan;
  if (planId !== '') {
    get(child(db, `plans/${planId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        plan = snapshot.val();
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return plan;
}

export {SavePlan, LoadPlan}