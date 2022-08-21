import * as React from 'react';
import {Button, Menu} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {TagMenuItem} from "./Tag";

const TagMenu = (props) => {
  const tags = props.tags;
  const selectedTag=props.selectedTag
  const timeslotOnClick = props.onClick;
  const id=props.id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleTimeslotClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, newTag) => {
    if (newTag && newTag !== selectedTag) {
      const oldTag = selectedTag || {};
      timeslotOnClick(event, newTag, oldTag);
    }
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={selectedTag ? selectedTag.colorClass : "tagColorNone"}>
      <Button
        id={`basic-button-${id}`}
        aria-controls={open ? 'basic-menu' : undefined }
        aria-haspopup={"true"}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleTimeslotClick}
        endIcon={<KeyboardArrowDown />}
      >
        {selectedTag ? selectedTag.name : '(blank)'}
      </Button>
      <Menu
        id={`basic-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { tags.map((tag) => (
          <TagMenuItem
            key={tag.id}
            tag={tag}
            selected={tag === selectedTag}
            onClick={(event) => handleMenuItemClick(event, tag)}
          />
        ))}
      </Menu>
    </div>
  )




}

export default TagMenu;