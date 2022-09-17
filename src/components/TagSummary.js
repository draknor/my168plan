import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid";
import {Snackbar, Alert} from "@mui/material";


const TagSummary = (props) => {
  const tags = props.tags;
  const tagStats = props.tagStats;
  const colors = props.colors;
  const setTags = props.setTags;
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const columns = [
    {field: 'name', headerName: 'Tag Name', width: 140, editable: true},
    {field: 'color', headerName: 'Color', width: 140},
    {field: 'colorClass', headerName: 'Color', width: 140},
    {field: 'hours', headerName: 'Hrs Assigned', type: 'number', width: 140}
  ]

  const rows = tags.map((tag) => {
                  return({
                    id: tag.id,
                    name: tag.name,
                    color: colors.find(color => color.cssClass === tag.colorClass).name,
                    colorClass:tag.colorClass,
                    hours: tagStats.find(tagStat => tagStat.id === tag.id).count
                  })
                })

  const processRowUpdate = (newRow, oldRow) => {
    console.log("processRowUpdate");
    console.log(newRow);
    console.log(oldRow);
    if (newRow) {
      let tagIndex = tags.findIndex(tag=> tag.id === newRow.id);
      let oldTag = tags[tagIndex];
      if (oldTag.name !== newRow.name) {
        let newTag = oldTag;
        newTag.name = newRow.name;
        let newTags = tags.slice();
        newTags[tagIndex] = newTag;
        setTags(newTags);
      }
    }
    //TODO - also figure out how to change color for tag.
    return newRow;
  }
  const handleProcessRowUpdateError = (error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper'}}>
      <Typography variant="h6" gutterBottom>
        Tag Summary
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                colorClass: false,
              },
            },
          }}

          rows={rows}
          columns={columns}
          getRowClassName={(params) => `${params.row.colorClass}`}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </Box>
  );
}

export default TagSummary;
