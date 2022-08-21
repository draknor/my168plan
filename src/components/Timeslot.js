import TagMenu from "./TagMenu";

const Timeslot = (props) => {
  const planArray = props.planArray;
  const weekday = props.weekday;
  const timeslotIndex = props.timeslotIndex;
  const parentOnClick = props.onClick;
  const tags = props.tags;
  const selectedTag=planArray[weekday][timeslotIndex];

  const handleClick = (event, newTag, oldTag) => {
    parentOnClick(event, newTag, oldTag, timeslotIndex, weekday);
  }

  return (
    <div className={"timeslot " + (timeslotIndex % 2 ? 'rowOdd' : 'rowEven')  }>
      <TagMenu
        tags={tags}
        selectedTag={selectedTag}
        id={`(${weekday},${timeslotIndex})`}
        onClick={handleClick}/>
    </div>
  )
}



export default Timeslot;

export const getTimeslots = (weekday) => {
  let timeslots = Array(24);
  for (let i=0 ; i<timeslots.length ; i++) {
    timeslots[i] = {
      id:  `(${weekday},${i})`,
      name: `(${weekday},${i})`,
      tagId: null
    }
  }
  return timeslots;
}

export const getTimeslotNameCollection = (timeslots) => {
  return ( timeslots.map((timeslot, num) => { return getTimeslotName(num); }) );
}

export const getTimeslotName = (timeslotNum) => {
  const timeslotNames = ['12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am',
    '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm',
    '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm',
    '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
  ];
  return (timeslotNum >= 0 && timeslotNum < timeslotNames.length) ? timeslotNames[timeslotNum] : null

}