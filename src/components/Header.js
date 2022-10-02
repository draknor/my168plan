import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";
import ClearButton from "./ClearButton";

const Header = (props) => {
  const saveOnClick = props.saveOnClick;
  const clearOnClick = props.clearOnClick;
  const loadOnClick = props.loadOnClick;
  const planId = props.planId;
  return (
    <Box sx={{ my: 4 }}>
        <Stack spacing={5} direction={"row"}>
          <Typography variant="h2" gutterBottom>
            My168 Planner
          </Typography>
          <SaveButton onClick={saveOnClick} planId={planId}/>
          <LoadButton onClick={loadOnClick} />
          <ClearButton onClick={clearOnClick} />
        </Stack>
    </Box>
  );
}

export default Header;