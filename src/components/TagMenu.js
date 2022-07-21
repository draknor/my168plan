import * as React from 'react';
import {Button, Menu, MenuItem} from "@mui/material";

const TagMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id={"basic-menu"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClick}>Option 1</MenuItem>
        <MenuItem onClick={handleClick}>Option 2</MenuItem>
        <MenuItem onClick={handleClick}>Option 3</MenuItem>
      </Menu>
    </div>
  )




}

export default TagMenu;