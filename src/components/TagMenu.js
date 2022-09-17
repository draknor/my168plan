import * as React from 'react';
import {Button, Menu} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {TagMenuItem} from "./Tag";

const TagMenu = (props) => {
  const tags = props.tags;
  const selectedTagId=props.selectedTagId
  const timeslotOnClick = props.onClick;
  const id=props.id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleTimeslotClick = (event) => {
    //console.log("handleTimeslotClick");
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, newTagId) => {
    //console.log("handleMenuItemClick");
    if (newTagId && newTagId !== selectedTagId) {
      const oldTagId = selectedTagId || {};
      timeslotOnClick(event, newTagId, oldTagId);
    }
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={ selectedTagId ? tags.find(tag => tag.id === selectedTagId).colorClass : "tagColorNone"  }>
      <Button
        id={`basic-button-${id}`}
        aria-controls={open ? 'basic-menu' : undefined }
        aria-haspopup={"true"}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleTimeslotClick}
        endIcon={<KeyboardArrowDown />}
      >
        { selectedTagId ? tags.find(tag => tag.id === selectedTagId).name : '(blank)' }
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
            selected={tag.id === selectedTagId}
            onClick={(event) => handleMenuItemClick(event, tag.id)}
          />
        ))}
      </Menu>
    </div>
  )

}

export default TagMenu;