import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {Save, Delete, Backup} from "@mui/icons-material";
import Stack from "@mui/material/Stack";


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
          <Button variant={"contained"} color={"info"} startIcon={<Backup />} onClick={loadOnClick}>Load</Button>
          <Button variant={"contained"} color={"success"} startIcon={<Save />} onClick={saveOnClick}>Save</Button>
          <Button variant={"contained"} color={"error"} startIcon={<Delete />} onClick={clearOnClick}>Clear</Button>
        </Stack>
    </Box>
  );
}

export default Header;