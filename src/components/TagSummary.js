import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid";

const TagSummary = (props) => {
  const tags = props.tags
  const columns = [
    {field: 'name', headerName: 'Tag Name', width: 140},
    {field: 'color', headerName: 'Color', width: 140},
    {field: 'hours', headerName: 'Hrs Assigned', type: 'number', width: 140}
  ]

  const rows = tags.map((tag) => {
                  return({
                    id: tag.id,
                    name: tag.name,
                    color:tag.colorClass,
                    hours: tag.count
                  })
                })



  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper'}}>
      <Typography variant="h6" gutterBottom>
        Tag Summary
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                color: false,
              },
            },
          }}
          rows={rows}
          columns={columns}
          getRowClassName={(params) => `${params.row.color}`}
        />
      </div>
    </Box>
  );
}

export default TagSummary;
