import Timeslot, { getTimeslotNameCollection } from './Timeslot';

const TimeslotRowHeader = (props) => {
  const timeslots = props.timeslots
  const headerNames = getTimeslotNameCollection(timeslots)

  return (
    <div className={"timeslotRowsHeader"}>
      <div className={"dayHeader"}>&nbsp;</div>
      { headerNames.map((timeslot, num) => {
        return (
          <div key={num} className={"timeslotRowHeader"}>
            {headerNames[num]}
          </div>
        )
      })}

    </div>


  );
}

export default TimeslotRowHeader;