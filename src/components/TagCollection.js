import Tag from './Tag';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import List from "@mui/material/List";

const TagCollection = (props) => {
  const tags = props.tags

  return (
    <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
      <Typography variant="h4" gutterBottom>
        Tags
      </Typography>
      <List>
        { tags.map((tag) => {
          return (
            <Tag key={tag.id} tag={tag}/>
          )
        })}
      </List>
    </Box>
  );
}

export default TagCollection;
