import {Button} from "@mui/material";
import {Delete} from "@mui/icons-material";

export default function ClearButton(props) {
  const handleClick=props.onClick;
  return (
    <div>
      <Button variant="outlined" color={"error"} startIcon={<Delete />} onClick={handleClick}>
        Clear
      </Button>
    </div>
  );
}
