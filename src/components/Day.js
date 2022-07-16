import Timeslot from "./Timeslot";

const Day = (props) => {
  const day = props.day;
  const name = day.name;
  const timeslots = day.timeslots;
  const onClick = props.onClick;

  return (
    <div className={"day"}>
      <div className={"dayHeader"}>{name}</div>
      { timeslots.map((timeslot, num) => {
        return (
          <Timeslot
            key={num}
            timeslot={timeslot}
            onClick={onClick}
          />
        )
      })}

    </div>

  );

}

export default Day;