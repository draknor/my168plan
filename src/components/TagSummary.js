import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import {Snackbar, Alert} from "@mui/material";
import ColorSelect from "./ColorSelect";
//import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const TagSummary = (props) => {
  const tags = props.tags;
  const tagStats = props.tagStats;
  const colors = props.colors;
  const setTags = props.setTags;
  const [snackbar, setSnackbar] = React.useState(null);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const handleCloseSnackbar = () => setSnackbar(null);

  const renderColorSelectCell = (params) => {
    return <ColorSelect
      colors={colors}
      {...params}/>;
  };

  const setColor = (params) => {
    const colorName = params.value;
    const colorIdx = colors.findIndex(color => color.name === colorName);
    const cssClass = colors[colorIdx].cssClass;
    return { ...params.row, colorIdx, cssClass }
  }

  const getColor = (params) => {
    return `${colors[params.row.colorIdx].name}`
  }

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  // Copied from https://mui.com/x/react-data-grid/editing/#FullFeaturedCrudGrid.js
  // const handleDeleteClick = (id) => () => {
  //   // setRows(rows.filter((row) => row.id !== id));
  // };


  const columns = [
    {
      field: 'name',
      headerName: 'Tag Name',
      width: 150,
      editable: true
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 100,
      editable: true,
      renderEditCell: renderColorSelectCell,
      valueGetter:  getColor,
      valueSetter:  setColor
    },
    {
      field: 'hours',
      headerName: 'Hours',
      type: 'number',
      width: 50
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 40,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon/>}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon/>}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon/>}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon/>}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    }
  ]


  const rows = tags.map((tag) => {
                  return({
                    id: tag.id,
                    name: tag.name,
                    colorIdx: colors.findIndex(color => color.cssClass === tag.cssClass),
                    cssClass:tag.cssClass,
                    hours: tagStats.find(tagStat => tagStat.id === tag.id).count
                  })
                })

  const processRowUpdate = (newRow) => {
    //console.log("processRowUpdate");
    //console.log(newRow);
    //console.log(oldRow);
    if (newRow) {
      let tagIndex = tags.findIndex(tag=> tag.id === newRow.id);
      let oldTag = tags[tagIndex];
      let newTag = oldTag;
      let newTags = tags.slice();

      if (oldTag.name !== newRow.name) {
        newTag.name = newRow.name;
        newTags[tagIndex] = newTag;
        setTags(newTags);
      }
      if (oldTag.cssClass !== newRow.cssClass) {
        newTag.cssClass = newRow.cssClass;
        newTags[tagIndex] = newTag;
        setTags(newTags);
      }
    }
    return newRow;
  }
  const handleProcessRowUpdateError = (error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }

  return (
    <Box sx={{ width: 350, bgcolor: 'background.paper'}}>
      <Typography variant="h5" gutterBottom>
        Tag Summary
      </Typography>
      <div>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={rows}
          columns={columns}
          autoHeight={true}
          disableSelectionOnClick={true}
          hideFooter={true}
          getRowClassName={(params) => `${params.row.cssClass}`}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          rowSpacingType="border"
          sx={{ '& .MuiDataGrid-row:hover': { borderColor: 'white', borderStyle: 'solid' } }}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}

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
