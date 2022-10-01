import {Button} from "@mui/material";
import {Save} from "@mui/icons-material";

export default function SaveButton(props) {
  const handleClick = props.onClick;
  return (
    <div>
      <Button variant="outlined" color={"success"} startIcon={<Save />} onClick={handleClick}>
        Save
      </Button>
    </div>
  );
}
