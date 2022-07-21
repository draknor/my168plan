import {ListItem, ListItemButton, ListItemText} from "@mui/material";

const Tag = (props) => {
  const tag = props.tag;

  return (
    <ListItem>
      <ListItemButton>
        <ListItemText primary={tag.name} />
      </ListItemButton>
    </ListItem>
  )
}
export default Tag;