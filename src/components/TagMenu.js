import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";

const TagMenu = (props) => {
  const tags = props.tags;
  const timeslotOnClick = props.onClick;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTag, setSelectedTag] = React.useState(props.selectedTag);
  const open = Boolean(anchorEl);

  const handleTimeslotClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, newTag) => {
    if (newTag && newTag !== selectedTag) {
      const oldTag = selectedTag || {};
      setSelectedTag(newTag);
      timeslotOnClick(event, newTag, oldTag);
    }
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={"basic-button"}
        aria-controls={open ? 'basic-menu' : undefined }
        aria-haspopup={"true"}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleTimeslotClick}
        endIcon={<KeyboardArrowDown />}
      >
        {selectedTag ? selectedTag.name : '(blank)'}
      </Button>
      <Menu
        id={"basic-menu"}
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
          <MenuItem
            key={tag.id}
            selected={tag === selectedTag}
            onClick={(event) => handleMenuItemClick(event, tag)}
          >
            {tag.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )




}

export default TagMenu;