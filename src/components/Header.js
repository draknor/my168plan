import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {Save, Delete} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import LoadDialog from "./LoadDialog";


const Header = (props) => {
  const saveOnClick = props.saveOnClick;
  const clearOnClick = props.clearOnClick;
  const loadOnClick = props.loadOnClick;
  return (
    <Box sx={{ my: 4 }}>
        <Stack spacing={5} direction={"row"}>
          <Typography variant="h2" gutterBottom>
            My168 Planner
          </Typography>
          <Button variant={"contained"} color={"success"} startIcon={<Save />} onClick={saveOnClick}>Save</Button>
          <LoadDialog onClick={loadOnClick} />
          <Button variant={"contained"} color={"error"} startIcon={<Delete />} onClick={clearOnClick}>Clear</Button>
        </Stack>
    </Box>
  );
}

export default Header;