import Select from '@mui/material/Select';
import {useGridApiContext} from "@mui/x-data-grid";


const ColorSelect = (props) => {
  const { id, value, field, colors } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      { colors.map((color) => (
        <option
          key={color.id}
          value={color.name}
        >{color.name}</option>
      ))}
    </Select>
  );
}

export default ColorSelect;