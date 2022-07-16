

const Timeslot = (props) => {
  const timeslot = props.timeslot;
  const onClick = props.onClick;

  return (
    <div className={"timeslot"} onClick={onClick} id={timeslot.id}>
      {timeslot.name}
    </div>

  )

}

export default Timeslot;

export const getTimeslots = (weekday) => {
  let timeslots = Array(24);
  for (let i=0 ; i<24 ; i++) {
    timeslots[i] = {
      id:  `(${weekday},${i})`,
      name: `(${weekday},${i})`
    }
  }
  return timeslots;
}

export const getTimeslotNameCollection = (timeslots) => {
  let timeslotCollection = timeslots.map((timeslot, num) => { return getTimeslotName(num); })

  return timeslotCollection;
}

export const getTimeslotName = (timeslotNum) => {
  const timeslotNames = ['12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am',
    '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm',
    '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm',
    '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
  ];
  return (timeslotNum >= 0 && timeslotNum < timeslotNames.length) ? timeslotNames[timeslotNum] : null

}