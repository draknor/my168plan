import {Button} from "@mui/material";
import {Save} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export default function SaveButton(props) {
  const handleClick = props.onClick;
  const planId = props.planId;
  return (
    <div>
      <Button sx={{width: 150}} variant="outlined" color={"success"} startIcon={<Save />} onClick={handleClick}>
        Save
      </Button>
      { (planId !== "")  &&
          <Typography>Plan ID: {planId}</Typography>
      }
    </div>
  );
}
