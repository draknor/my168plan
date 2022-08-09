import {ListItem, ListItemButton, ListItemText, MenuItem} from "@mui/material";
import * as React from "react";

const Tag = (props) => {
  const tag = props.tag;

  return (
    <span>{tag.name}</span>
  )
}
export default Tag;

export const TagDisplay = (props) => {
  const tag = props.tag;

  return (
    <ListItem>
      <ListItemButton>
        <ListItemText primary={tag.name} secondary={`Count: ${tag.count}`} />
      </ListItemButton>
    </ListItem>
  )
}

export const TagMenuItem = (props) => {
  const tag = props.tag;
  const selected = props.selected;
  const onClick = props.onClick;

  return (
    <MenuItem
      selected={selected}
      onClick={onClick}
    >
      {tag.name}
    </MenuItem>
    )
}